import { Input } from '@angular/core';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import * as HttpStatus from 'http-status-codes';

import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { DescargaEventsNotifierService } from '../services/descarga-events-notifier.service';
import { Terminal } from '../../../shared/data-models/terminal';
import { Destinatario } from '../../../shared/data-models/destinatario';
import { Productos, TipoFinalidad, Sociedades } from '../../../shared/enums/enums';
import { Vendedor } from '../../../shared/data-models/vendedor';
import { DatosDocumentoBaseComponent } from './datos-documento-base.component';
import { ParametrosTerminalService } from '../services/parametros-terminal.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { CampoEpaSustentable } from '../../../shared/data-models/campo-epa-sustentable';
import { Producto } from '../../../shared/data-models/producto';
import { Intermediario } from '../../../shared/data-models/intermediario';
import { RemitenteComercial } from '../../../shared/data-models/remitente-comercial';
import { Titular } from '../../../shared/data-models/titular';
import { Finalidad } from '../../../shared/data-models/finalidad';
import { ParametrosTerminalDataView } from '../../../shared/data-models/parametros-terminal-data-view';
import { AutocompleteSedeService } from '../services/autocomplete-sede.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CupoService } from '../cupo/service/cupo.service';
import { CodigoCupo } from '../../../shared/data-models/codigo-cupo';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';
import { ProductosHablitadosPorTerminalDataView } from '../../../shared/data-models/productos-hablitados-por-terminal-data-view';

export class DatosDocumentoCerealesComponent extends DatosDocumentoBaseComponent {

  @Input() cargaNuevoVagon = false;
  @Input() ingresoConCupo: boolean;
  @Input() ingresoSinCupo: boolean;

  tipoProducto: TipoProducto;
  esConsulta: boolean;
  datosDocumentoForm: FormGroup;
  terminal: Terminal;
  esFueraCircuito: boolean;
  debeDeshabilitarControlesPorMovimientoAplicadoEnSan: boolean;
  fillCosecha: boolean;
  fillCampoEpa: boolean;
  movimiento: MovimientoCerealGrano;
  autocompleteSedeOrigenService: AutocompleteSedeService;
  autocompleteSedeDestinoService: AutocompleteSedeService;
  finalidad: Finalidad;
  codigoCupoAnterior: string;
  tieneCodigoCupoValido = true;
  esCargaMovimientoNavegacion = false;
  cupo: CodigoCupo;
  deshabilitarBotonAceptarPorCupoInvalido = false;
  esSojaEPA = false;

  codigoCupoRegex = [/^[a-zA-Z]+$/, /^[a-zA-Z]+$/, /^[a-zA-Z]+$/, '-', /^[a-zA-Z]+$/, /^[a-zA-Z]+$/, /^[a-zA-Z]+$/, '-',
    /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, '-', /[0-9 ]+/,
    /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/];

  get tieneCupoConVendedor(): boolean {
    return (!this.cupo && this.movimiento && !!this.movimiento.codigoCupo && !!this.movimiento.vendedor) ||
      (!!this.cupo && !!this.cupo.vendedor);
  }

  constructor(protected eventsNotifierService: DescargaEventsNotifierService,
    protected parametrosTerminalService: ParametrosTerminalService,
    protected readonly fcService: FormComponentService,
    protected readonly apiService: ApiService,
    private readonly cupoService: CupoService,
    private readonly popupService: PopupService,
    private readonly finalidadService: FinalidadService,
    public readonly authService: AuthService,
    public readonly productoPorTerminalService: AdministrarProductosHabilitadosPorTerminalService) {
    super(eventsNotifierService,
      parametrosTerminalService,
      fcService);

    this.autocompleteSedeOrigenService = new AutocompleteSedeService(this.apiService);
    this.autocompleteSedeOrigenService.esOrigen = true;

    this.autocompleteSedeDestinoService = new AutocompleteSedeService(this.apiService);
    this.autocompleteSedeDestinoService.esOrigen = false;
  }

  protected createForm() {
  }

  protected loadMovimiento(movimiento: Movimiento) {
    this.loadMovimiento(movimiento);
  }

  protected subscribirseCambiosDocumentoCereales() {
    this.subscribeCambioProducto();
    this.subscribeCambioSustentabilidad();
    this.subscribeCambioNoLlevaEstablecimiento();
    this.subscribeCambioCampoEpaSustentable();
  }

  protected subscribirseCambiosDocumento() {
    this.subscribeCambioVendedor();
    this.subscribeCambioSedeOrigen();
    this.subscribeCambioDestinatario();
    this.subscribeCambioFinalidad();
    this.subscribeCambioIntermediario();
    this.subscribeCambioTitularRemitenteComercial();
    this.subscribeCambioConCupo();
  }

  protected resetForm() {
  }

  private subscribeCambioConCupo(): void {
    const conCupoCntrl = this.fcService.getControl('conCupo');
    if (conCupoCntrl) {
      conCupoCntrl.valueChanges.pipe(
        takeUntil(this.onDestroy)
      ).subscribe((esConCupo: boolean | null) => {
        if (esConCupo != null) {
          if (esConCupo) {
            if (!this.esConsulta) {
              this.fcService.enableControl('codigoCupo');
            }
            this.deshabilitarControlesCupo();
          } else {
            this.habilitarControlerCupo();
            this.fcService.setValue(`codigoCupo`, '', { onlySelf: true });
            this.fcService.setValue(`usuarioCupoSAN`, '');
            this.tieneCodigoCupoValido = false;
            this.deshabilitarBotonAceptarPorCupoInvalido = false;
            this.fcService.disableControl('codigoCupo');
          }
        }
      });
    }
  }

  private deshabilitarControlesCupo(): void {
    this.fcService.disableControl('producto');
    this.fcService.disableControl('destinatario');
    this.fcService.disableControl('finalidad');
    this.fcService.disableControl('motivoCupo');
  }

  private habilitarControlerCupo(): void {
    if (!this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan && !this.esConsulta) {
      this.fcService.enableControl('destinatario');
      this.fcService.enableControl('finalidad');
      this.fcService.enableControl('motivoCupo');

      if (this.movimiento && !this.movimiento.esFleteCorto) {
        this.fcService.enableControl('corredorComprador');
      }

      if (!this.esAlta) {
        this.setVendedor();
      }
    }
    if (!this.esFueraCircuito) {
      this.fcService.enableControl('producto');
    }
  }

  protected setVendedor() {
    const remitenteComercial = this.fcService.getControl('remitenteComercial');
    const titular = this.fcService.getControl('titularCartaPorte');

    if (remitenteComercial && titular) {
      if (remitenteComercial.value) {
        this.fcService.setValue('vendedor', remitenteComercial.value, { onlySelf: true });
      } else if (titular.value) {
        this.fcService.setValue('vendedor', titular.value, { onlySelf: true });
      }
    }
  }

  protected recuperarCupo(): void {
    const codigoCupoCtrl = this.fcService.getControl('codigoCupo');
    if (codigoCupoCtrl && codigoCupoCtrl.value && codigoCupoCtrl.valid) {
      this.cupoService.getCupoPorCodigo(codigoCupoCtrl.value, this.movimiento.id, this.tipoProducto)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((cupoDataView: CodigoCupo) => {
          if (cupoDataView && !this.esCargaMovimientoNavegacion) {

            if (this.movimiento &&
              this.movimiento.tieneCalidad &&
              this.movimiento.producto &&
              this.movimiento.producto.id !== cupoDataView.producto.id) {
              this.popupService.error(Resources.Messages.NoSePuedeUsarCupoPorqueProductoActualTieneCalidad, Resources.Labels.Error);
              if (this.codigoCupoAnterior) {
                this.fcService.setValue(`codigoCupo`, this.codigoCupoAnterior, { onlySelf: true });
              } else {
                codigoCupoCtrl.setErrors({ CupoInvalido: true });
                this.fcService.setValue(`usuarioCupoSAN`, '');
                this.deshabilitarBotonAceptarPorCupoInvalido = true;
              }
            } else {
              this.cupo = new CodigoCupo();
              Object.assign(this.cupo, cupoDataView);
              this.loadDatosCupo(this.cupo);
              this.deshabilitarControlesCupo();
              this.verificarEstadoInicialCupo();
              this.tieneCodigoCupoValido = true;
              this.codigoCupoAnterior = codigoCupoCtrl.value;
              this.deshabilitarBotonAceptarPorCupoInvalido = false;
            }
          }
        }, (error: HttpErrorResponse) => {
          if (error.status === HttpStatus.NOT_FOUND) {
            this.popupService.error(Resources.Messages.ElCupoIngresadoNoExiste, Resources.Labels.Error);
            codigoCupoCtrl.setErrors({ CupoIngresadoNoExiste: true });
            this.deshabilitarBotonAceptarPorCupoInvalido = true;
          } else {
            codigoCupoCtrl.setErrors({ CupoInvalido: true });
            this.deshabilitarBotonAceptarPorCupoInvalido = true;
          }

          if (this.codigoCupoAnterior) {
            this.fcService.setValue(`codigoCupo`, this.codigoCupoAnterior, { onlySelf: true });
          } else {
            codigoCupoCtrl.setErrors({ CupoInvalido: true });
            this.fcService.setValue(`usuarioCupoSAN`, '');
            this.deshabilitarBotonAceptarPorCupoInvalido = true;
          }

          this.tieneCodigoCupoValido = false;
        });
    }
  }

  private loadDatosCupo(cupo: CodigoCupo): void {
    this.fcService.setValue(`finalidad`, cupo.finalidad, { onlySelf: true });
    this.fcService.setValue(`producto`, cupo.producto, { onlySelf: true });
    if (!!cupo.vendedor) {
      this.fcService.setValue(`vendedor`, cupo.vendedor, { onlySelf: true });
    } else {
      this.setVendedor();
    }
    this.fcService.setValue(`corredorComprador`, cupo.corredorComprador, { onlySelf: true });
    this.fcService.setValue(`destinatario`, cupo.destinatario, { onlySelf: true });
    this.fcService.setValue(`motivoCupo`, cupo.motivo, { onlySelf: true });
    this.fcService.setValue(`sedeOrigen`, cupo.sedeOrigen, { onlySelf: true });
    this.fcService.setValue(`usuarioCupoSAN`, cupo.usuarioSAN, { onlySelf: true }, true);
    this.fcService.setValue(`estadoCupo`, cupo.estadoInicial.descripcion, { onlySelf: true });


    this.verificarCorredorParaCupo();
  }

  private verificarCorredorParaCupo(): void {
    const corredor = this.fcService.getControl('corredorComprador');
    if (corredor && !corredor.value) {
      this.fcService.enableControl('corredorComprador');
      this.parametrosTerminalService.getParametros().pipe(takeUntil(this.onDestroy)).subscribe((parametros: ParametrosTerminalDataView) => {
        if (parametros.corredorPorDefecto) {
          this.popupService.info(Resources.Messages.ElCupoNoTieneCorredorAsignadoSeIngresaraComoDefectoX
            .format(parametros.corredorPorDefecto.descripcion || ''),
            Resources.Labels.Notificacion);
          this.fcService.setValue('corredorComprador', parametros.corredorPorDefecto, { onlySelf: true }, true);
        }
      });
    }
  }

  private verificarEstadoInicialCupo(): void {
    if (this.cupo && this.cupo.esEstadoInicialSinCupo()) {
      this.popupService.error(Resources.Messages.LaFechaDelCupoEsAnteriorOPosteriorALaPermitidaSeIngresaraSinCupo,
        Resources.Labels.Notificacion);
    }
  }

  protected subscribeCambioIntermediario() {
    const intermediario = this.datosDocumentoForm.get('intermediario');
    if (intermediario) {
      intermediario.valueChanges.pipe(takeUntil(this.onDestroy))
        .subscribe((value: Intermediario) => {
          if (value) {
            this.fcService.setValue('opONCCAIntermediario', value.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
          } else {
            this.fcService.setValue('opONCCAIntermediario', '', { onlySelf: true, emitEvent: false });
          }
        });
    }
  }

  protected subscribeCambioCampoEpaSustentable() {
    const campoEpa = this.datosDocumentoForm.get('campoEpa');
    if (campoEpa) {
      campoEpa.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((value: CampoEpaSustentable) => {
          if (value) {
            this.fcService.setValue('procendencia', '', { onlySelf: true, emitEvent: false });
            if (!this.esConsulta) {
              this.setearDependenciasCampoEpa(value);
            }
            if (this.esSojaEPA) {
              this.fcService.setValue('sustentabilidad', value.esSustentable, { onlySelf: true, emitEvent: false }, true);
              this.fcService.setValue('establecimiento.numeroEstablecimiento', '',
                { onlySelf: true, emitEvent: false});
            }
          }
        });
    }
  }

  protected setearDependenciasCampoEpa(campoEpa: CampoEpaSustentable) {
    this.fcService.setValue('procedencia', campoEpa.ciudad, { onlySelf: true, emitEvent: false }, true);
    this.fcService.setValue('cosecha', campoEpa.cosecha, { onlySelf: true, emitEvent: false }, true);
    this.fcService.setValue('establecimiento.numeroEstablecimiento', Number(campoEpa.codigoRUCA),
      { onlySelf: true, emitEvent: false}, false);
    this.fcService.setValue('establecimiento.noLlevaEstablecimiento', !campoEpa.codigoRUCA, { onlySelf: true, emitEvent: false}, false);
  }

  protected subscribeCambioProducto() {
    const productoCtrl = this.datosDocumentoForm.controls.producto;
    productoCtrl.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy)).subscribe((value: Producto) => {
      if (value) {
        if (value.id === Productos.SojaEPA) {
          this.esSojaEPA = true;
          this.fillCosecha = false;
          this.activarCampoEpa(true);
        } else {
          this.esSojaEPA = false;
          this.fillCosecha = true;
          this.activarCampoEpa(false);
          this.activarSustentabilidad(true);
          this.consultarProductoPorTerminal(value.id);
        }
      }
    });
  }

  private consultarProductoPorTerminal(idProducto: number) {
    const userContext = this.authService.getUserContext();
    if (userContext && idProducto > 0) {
      this.productoPorTerminalService.getProductoPorTerminal(idProducto, userContext.terminal.id)
      .pipe(takeUntil(this.onDestroy))
        .subscribe((data: ProductosHablitadosPorTerminalDataView) => {
          this.activarSustentabilidad(data.usaSustentabilidad);
        });
    } else {
      this.activarSustentabilidad(false);
    }
  }

  private activarSustentabilidad(usaSustentabilidad: boolean = false) {
    if (!this.esConsulta && usaSustentabilidad) {
      this.datosDocumentoForm.controls.sustentabilidad.enable();
    } else if (!this.esConsulta) {
      this.datosDocumentoForm.controls.sustentabilidad.disable();
      this.datosDocumentoForm.controls.sustentabilidad.reset();
    }
    if (!this.movimiento && !this.cargaNuevoVagon && usaSustentabilidad && !this.circuitoContemplaCupo) {
        this.parametrosTerminalService.getParametros().pipe(takeUntil(this.onDestroy))
          .subscribe((parametros: ParametrosTerminalDataView) => {
            this.fcService.setValue('sustentabilidad', parametros.sustentabilidadPorDefectoParaSoja, { onlySelf: true });
          });
    }
  }

  protected subscribeCambioNoLlevaEstablecimiento() {
    const noLlevaEstablecimiento = this.datosDocumentoForm.get('establecimiento.noLlevaEstablecimiento');
    const numeroEstablecimiento = this.datosDocumentoForm.get('establecimiento.numeroEstablecimiento');

    if (noLlevaEstablecimiento && numeroEstablecimiento) {
      noLlevaEstablecimiento.valueChanges
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((value: boolean) => {

          if (value) {
            numeroEstablecimiento.clearValidators();
            numeroEstablecimiento.updateValueAndValidity();
          } else {
            numeroEstablecimiento.setValidators(Validators.required);
            numeroEstablecimiento.updateValueAndValidity();
          }
        });
    }
  }

  protected subscribeCambioSustentabilidad() {
    const sustentableCtrl = this.datosDocumentoForm.controls.sustentabilidad;
    sustentableCtrl.valueChanges
      .pipe(
        takeUntil(this.onDestroy),
        distinctUntilChanged()
      ).subscribe((value: boolean) => {
        if (!this.esSojaEPA) {
          this.activarCampoEpa(value);
          if (!value && !this.esConsulta && !sustentableCtrl.disabled) {
            this.fcService.setValue('procedencia', '', { onlySelf: true });
          }
        }
      });
  }

  protected activarCampoEpa(activarCampoEpa: boolean) {
    if (!this.esConsulta) {
      if (activarCampoEpa) {
        this.fillCampoEpa = true;
        this.datosDocumentoForm.controls.cosecha.disable();
        this.datosDocumentoForm.controls.procedencia.disable();
        this.datosDocumentoForm.controls.campoEpa.enable();
        if (!this.esSojaEPA) {
          this.datosDocumentoForm.controls.campoEpa.setValue('');
        }
      } else {
        this.fillCampoEpa = false;
        this.datosDocumentoForm.controls.cosecha.enable();
        this.datosDocumentoForm.controls.procedencia.enable();
        this.datosDocumentoForm.controls.campoEpa.disable();
        this.fcService.setValue('establecimiento.numeroEstablecimiento', '', { onlySelf: true, emitEvent: false});
        this.fcService.setValue('sustentabilidad', false);
      }
    } else {
      this.fillCampoEpa = true;
      this.datosDocumentoForm.controls.campoEpa.disable();
      this.datosDocumentoForm.controls.cosecha.disable();
      this.datosDocumentoForm.controls.procedencia.disable();
    }
  }

  protected subscribeCambioVendedor() {
    const vendedor = this.datosDocumentoForm.get('vendedor');
    if (vendedor) {
      vendedor.valueChanges
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((value: Vendedor) => {
          this.autocompleteSedeOrigenService.idVendedor = value ? value.id : null;
          this.autocompleteSedeDestinoService.idVendedor = value ? value.id : null;
          this.setearOpONCAAVendedor(value);
          if (!value || value.id !== Sociedades.LDC) {
            const sedeOrigenCtrl = this.fcService.getControl('sedeOrigen');
            if (sedeOrigenCtrl) {
              sedeOrigenCtrl.clearValidators();
              if (!this.esConsulta) {
                this.fcService.setValue('sedeOrigen', '');
              }
              sedeOrigenCtrl.updateValueAndValidity();
              this.fcService.disableControl('sedeOrigen');
            }
          } else {
            this.manejarSedeOrigen();
          }
        });
    }
  }
  protected subscribeCambioSedeOrigen() {
    const sedeOrigen = this.datosDocumentoForm.get('sedeOrigen');

    if (sedeOrigen) {
      sedeOrigen.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy)).subscribe(value => {
        this.autocompleteSedeDestinoService.idSedeOrigen = value ? value.id : null;
      });
    }
  }

  private setearOpONCAAVendedor(value: Vendedor) {
    if (value) {
      if (!this.esConsulta) {
        this.fcService.setValue('opONCCAVendedor', value.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
      }
    } else {
      this.fcService.setValue('opONCCAVendedor', '', { onlySelf: true, emitEvent: false });
    }
  }

  protected subscribeCambioDestinatario() {
    const destinatario = this.datosDocumentoForm.get('destinatario');
    if (destinatario) {
      destinatario.valueChanges
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((value: Destinatario) => {
          if ((!value || value.id !== Sociedades.LDC)
              && this.finalidad
              && (this.esCVoAcopio(this.finalidad.id))) {
            this.fcService.setValue('sedeDestino', this.terminal.sede);
            this.fcService.disableControl('sedeDestino');
          } else {
            this.manejarSedeDestino();
          }
        });
    }
  }

  protected manejarSedeOrigen(): void {
    const idVendedor = this.fcService.getValue('vendedor');
    const idFinalidad = this.fcService.getValue('finalidad');
    const vendedorEsLDC = idVendedor === Sociedades.LDC;

    if (vendedorEsLDC) {
      this.finalidadService.getTipoFinalidad(idFinalidad)
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe(tipoFinalidad => {
          const sedeOrigenCtrl = this.fcService.getControl('sedeOrigen');
          if (sedeOrigenCtrl) {
            if (!this.esConsulta &&
                (this.esCVoAcopio(tipoFinalidad) || tipoFinalidad === TipoFinalidad.Transferencia)) {
              this.fcService.enableControl('sedeOrigen');
              sedeOrigenCtrl.setValidators(Validators.required);
              sedeOrigenCtrl.updateValueAndValidity();
            } else {
              sedeOrigenCtrl.clearValidators();
              if (!this.esConsulta) {
                this.fcService.setValue('sedeOrigen', '');
              }
              sedeOrigenCtrl.updateValueAndValidity();
              this.fcService.disableControl('sedeOrigen');
            }
          }
        });
    }
  }

  protected manejarSedeDestino() {
    const idDestinatario = this.fcService.getValue('destinatario');
    const idFinalidad = this.fcService.getValue('finalidad');
    const destinatarioEsLDC = idDestinatario === Sociedades.LDC;

    if (destinatarioEsLDC && this.terminal.puerto.esAcopio) {
      this.finalidadService.getTipoFinalidad(idFinalidad)
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe(tipoFinalidad => {
          const sedeDestinoCtrl = this.fcService.getControl('sedeDestino');
          if (sedeDestinoCtrl) {
            if ( !this.esConsulta && (this.esCVoAcopio(tipoFinalidad)
                || tipoFinalidad === TipoFinalidad.Transferencia)) {
              this.fcService.enableControl('sedeDestino');
            } else {
              this.fcService.disableControl('sedeDestino');
            }
          }
        });
    }
  }

  protected debeDeshabilitarSedePorConsultaOModificacionVagones(): boolean {
    return this.esConsulta;
  }

  protected subscribeCambioFinalidad() {
    const finalidadCtrl = this.datosDocumentoForm.get('finalidad');
    if (finalidadCtrl) {
      finalidadCtrl.valueChanges
        .pipe(distinctUntilChanged((x, y) => {
          if (x && y) {
            return x.id === y.id;
          }
          return false;
        }), takeUntil(this.onDestroy))
        .subscribe((finalidad: Finalidad) => {
          this.finalidad = finalidad;
          this.autocompleteSedeOrigenService.idFinalidad = finalidad ? finalidad.id : null;
          this.autocompleteSedeDestinoService.idFinalidad = finalidad ? finalidad.id : null;
          if (!this.esConsulta && this.terminal.puerto.esAcopio) {
            if (finalidad.id === TipoFinalidad.Transferencia || this.esCVoAcopio(finalidad.id)) {
              this.fcService.setValue('sedeDestino', (finalidad.id === TipoFinalidad.Transferencia) ? '' : this.terminal.sede);
            }
            this.fcService.setValue('sedeOrigen', '');
          }
          this.manejarSedeOrigen();
          this.manejarSedeDestino();
        });
    }
  }

  protected subscribeCambioTitularRemitenteComercial() {
    const titular = this.datosDocumentoForm.get('titularCartaPorte');
    const remitenteComercial = this.datosDocumentoForm.get('remitenteComercial');
    const vendedor = this.datosDocumentoForm.get('vendedor');

    if (titular && remitenteComercial && vendedor) {
      this.subscribeCambioTitular(titular, remitenteComercial, vendedor);
      this.subscribeRemitenteComercial(titular, remitenteComercial, vendedor);
    }
  }

  protected subscribeCambioTitular(titular: AbstractControl, remitenteComercial: AbstractControl, vendedor: AbstractControl) {
    titular.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
      .subscribe((ti: Titular) => {
        if (ti) {
          this.fcService.setValue('opONCCATitular', ti.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
          if (!remitenteComercial.value && (!this.circuitoContemplaCupo ||
            (this.circuitoContemplaCupo &&
              (!this.tieneCodigoCupoValido || (this.tieneCodigoCupoValido && !this.tieneCupoConVendedor)) &&
              !this.esAlta &&
              !this.esConsulta
            ))) {
            vendedor.setValue(ti);
            this.fcService.setValue('opONCCAVendedor', ti.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
          }
        } else {
          this.fcService.setValue('opONCCATitular', '', { onlySelf: true, emitEvent: false });
          if (!remitenteComercial.value && (!this.circuitoContemplaCupo ||
            (this.circuitoContemplaCupo &&
              (!this.tieneCodigoCupoValido || (this.tieneCodigoCupoValido && !this.tieneCupoConVendedor)) &&
              !this.esAlta &&
              !this.esConsulta
            ))) {
            vendedor.reset();
            this.fcService.setValue('opONCCAVendedor', '', { onlySelf: true, emitEvent: false });
          }
        }
        this.fcService.setValue('campoEpa', '');
      });
  }

  protected subscribeRemitenteComercial(titular: AbstractControl, remitenteComercial: AbstractControl, vendedor: AbstractControl) {
    remitenteComercial.valueChanges.pipe(takeUntil(this.onDestroy)).subscribe((re: RemitenteComercial) => {
      if (re && remitenteComercial.value) {
        this.fcService.setValue('opONCCARemitenteComercial', re.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
        if (!this.circuitoContemplaCupo ||
          (this.circuitoContemplaCupo &&
            (!this.tieneCodigoCupoValido || (this.tieneCodigoCupoValido && !this.tieneCupoConVendedor)) &&
            !this.esAlta &&
            !this.esConsulta)) {
          this.fcService.setValue('opONCCAVendedor', re.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
          vendedor.setValue(re);
        }
      } else {
        this.fcService.setValue('opONCCARemitenteComercial', '', { onlySelf: true, emitEvent: false });
        if (!this.circuitoContemplaCupo ||
          (this.circuitoContemplaCupo &&
            (!this.tieneCodigoCupoValido || (this.tieneCodigoCupoValido && !this.tieneCupoConVendedor)) &&
            !this.esAlta &&
            !this.esConsulta)) {
          if (titular.value) {
            vendedor.setValue(titular.value);
            this.fcService.setValue('opONCCAVendedor', titular.value.codigoOperadorOncca, { onlySelf: true, emitEvent: false });
          } else {
            vendedor.reset();
            this.fcService.setValue('opONCCAVendedor', '', { onlySelf: true, emitEvent: false });
          }
        }
      }
      vendedor.updateValueAndValidity();
    });
  }

  private esCVoAcopio(tipoFinalidad: any): boolean {
    return ((tipoFinalidad === TipoFinalidad.CompraVenta) || (tipoFinalidad === TipoFinalidad.Acopio)) ;
  }
}

