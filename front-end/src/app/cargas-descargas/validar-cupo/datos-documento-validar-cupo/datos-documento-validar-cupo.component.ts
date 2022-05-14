import { Component, Input, OnChanges, SimpleChanges, ViewChild, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { ConfirmacionArriboCtgComponent } from '../../shared/confirmacion-arribo-ctg/confirmacion-arribo-ctg.component';
import { Acciones, Productos, TipoFinalidad, Sociedades } from '../../../shared/enums/enums';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { catchError, distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Producto } from '../../../shared/data-models/producto';
import { Finalidad } from '../../../shared/data-models/finalidad';
import { Sede } from '../../../shared/data-models/sede';
import { CampoEpaSustentable } from '../../../shared/data-models/campo-epa-sustentable';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { MovimientoCupo } from '../../../shared/data-models/movimiento-cupo';
import { EstadoVigenciaCupoDataView } from '../../../shared/data-models/Estado-vigencia-cupo-data-view';
import { Vendedor } from '../../../shared/data-models/vendedor';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ParametrosTerminalDataView } from '../../../shared/data-models/parametros-terminal-data-view';
import { CodigoCupo } from '../../../shared/data-models/codigo-cupo';
import { AutocompleteSedeService } from '../../shared/services/autocomplete-sede.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable, ReplaySubject } from 'rxjs';
import { TurnoCircularDataView } from '../../../shared/data-models/turno-circular-data-view';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';
import { ProductosHablitadosPorTerminalDataView } from '../../../shared/data-models/productos-hablitados-por-terminal-data-view';
import { AuthService } from '../../../core/services/session/auth.service';

@Component({
  selector: 'yrd-datos-documento-validar-cupo',
  templateUrl: './datos-documento-validar-cupo.component.html',
  styleUrls: ['./datos-documento-validar-cupo.component.css']
})
export class DatosDocumentoValidarCupoComponent implements OnInit, OnChanges, OnDestroy {

  @Input() datosDocumento: FormGroup;
  @Input() circuito: Circuito;
  @Input() cupo: CodigoCupo;
  @Input() movimiento: MovimientoCupo;
  @Input() esCartaPorteElectronica = false;
  @Input() esConsulta = false;
  @Input() tieneCaracteristicaDeCTG = false;
  @Input() esAltaValidacionCupo: boolean;
  @Input() fillCosecha: boolean;
  @Input() fillCampoEpa: boolean;
  @Input() tipoProducto: TipoProducto;
  @Input() estadoCupoDataView: EstadoVigenciaCupoDataView | null;
  @Output() tieneAFIPAutomatico: EventEmitter<boolean> = new EventEmitter();
  @ViewChild('confirmacionArribo') confirmacionArriboCtg: ConfirmacionArriboCtgComponent;

  onDestroy: ReplaySubject<Boolean> = new ReplaySubject();
  autocompleteSedeService: AutocompleteSedeService;
  finalidad: Finalidad;
  debeCompletarCosechaPorDefecto = false;
  AFIPAutomatico = false;
  sinConfirmarCtg = true;
  turnoCircular: TurnoCircularDataView;
  confirmoCtg = false;

  get esMovimientoSinCupo(): boolean {
    return this.movimiento !== undefined && this.movimiento.cupo === null;
  }

  get titular(): any {
    // tslint:disable-next-line: no-non-null-assertion
    return this.esCartaPorteElectronica ? this.fcService.getControl('documentoPorte.titularCartaPorteCPE')!.value :
    // tslint:disable-next-line: no-non-null-assertion
                                          this.fcService.getControl('datosDocumento.titularCartaPorteSojaEPA')!.value;
  }

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoCorrespondeAlCircuito
  };

  validationMessagesSede = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Sede)
  };

  validationMessagesDestinatario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destinatario),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesCorredorComprador = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CorredorComprador),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesVendedor = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Vendedor),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesFinalidad = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Finalidad)
  };

  validationMessagesTitular = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Titular)
  };

  validationMessagesCosecha = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Cosecha)
  };

  validationMessagesProcedencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Procedencia)
  };

  validationMessagesMotivoCupo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.MotivoCupo)
  };

  constructor(private readonly fcService: FormComponentService,
    private readonly dispositivoService: DispositivoService,
    private readonly parametrosTerminalService: ParametrosTerminalService,
    private readonly popupService: PopupService,
    private readonly apiService: ApiService,
    public readonly productoService: AdministrarProductosHabilitadosPorTerminalService,
    public readonly authService: AuthService) {
    this.autocompleteSedeService = new AutocompleteSedeService(this.apiService);
    this.autocompleteSedeService.esOrigen = true;
  }

  ngOnInit(): void {
    this.dispositivoService.consultarAccion(Acciones.WSAFIP).pipe(
      takeUntil(this.onDestroy)
    ).subscribe(result => {
      this.AFIPAutomatico = result.esAutomatica === true;
      this.tieneAFIPAutomatico.emit(this.AFIPAutomatico);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const cupoChange = changes['cupo'];
    const movimientoChange = changes['movimiento'];
    const datosDocumentoControlChange = changes['datosDocumento'];
    const esCambioCupo = cupoChange && cupoChange.previousValue !== undefined && cupoChange.currentValue !== cupoChange.previousValue;

    if ((this.esAltaValidacionCupo || this.esMovimientoSinCupo) && cupoChange && cupoChange.currentValue || esCambioCupo) {
      // se pone el if aca porque el if anterior es muy complejo
      if (this.cupo) {
        this.loadDatosCupo(this.cupo);
        this.verificarParticipantes();
      }
    }

    if (movimientoChange && movimientoChange.currentValue) {
      this.loadDatosMovimiento(this.movimiento);
      this.habilitarCTG(this.tieneCaracteristicaDeCTG);
    }

    if (datosDocumentoControlChange && (datosDocumentoControlChange.previousValue !== datosDocumentoControlChange.currentValue)) {
      this.subscribeToControlChanges();
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  private verificarParticipantes(): void {
    this.verificarVendedor();
    this.verificarCorredor();
  }

  private verificarVendedor(): void {
    const vendedor = this.fcService.getControl('datosDocumento.vendedor');
    if (vendedor && !vendedor.value) {
      this.fcService.enableControl('datosDocumento.vendedor');
    }
  }

  private verificarCorredor(): void {
    const corredor = this.fcService.getControl('datosDocumento.corredorComprador');
    if (corredor && !corredor.value) {
      this.fcService.enableControl('datosDocumento.corredorComprador');
      this.parametrosTerminalService.getParametros().pipe(
        takeUntil(this.onDestroy)
      ).subscribe((parametros: ParametrosTerminalDataView) => {
        if (parametros.corredorPorDefecto) {
          this.popupService.info(Resources.Messages.ElCupoNoTieneCorredorAsignadoSeIngresaraComoDefectoX
            .format(parametros.corredorPorDefecto.descripcion ? parametros.corredorPorDefecto.descripcion : ''),
            Resources.Labels.Notificacion);
          this.fcService.setValue('datosDocumento.corredorComprador', parametros.corredorPorDefecto, { emitEvent: true }, true);
        }
      });
    }
  }

  private subscribeToControlChanges(): void {
    this.subscribeCambioProducto();
    this.subscribeCambioFinalidad();
    this.subscribeCambioCampoEpaSustentable();
    this.subscribeCambioVendedor();
      this.suscribirCambiosCtg();
      this.suscribirConfirmadoManualmente();
    this.subscribeCambioSustentabilidad();
  }

  private suscribirConfirmadoManualmente(): void {
    const aceptarSinConfirmarCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const confirmadoManualmente = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    const codigoCancelacionCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');


    if (aceptarSinConfirmarCtg && confirmadoManualmente && codigoCancelacionCtg) {
      if (this.esConsulta) {
        confirmadoManualmente.disable();
      } else {
        confirmadoManualmente.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      )
        .subscribe((value: boolean) => {
          if (value) {
            aceptarSinConfirmarCtg.reset();
            aceptarSinConfirmarCtg.disable();
            codigoCancelacionCtg.reset();
            codigoCancelacionCtg.disable();
          } else if (value === false) {
            aceptarSinConfirmarCtg.enable();
          }
        });
      }
    }
  }

  private suscribirCambiosCtg(): void {
    const aceptarSinConfirmarCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const confirmadoManualmente = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');

    if (aceptarSinConfirmarCtg && confirmadoManualmente ) {
      if (this.esConsulta) {
        aceptarSinConfirmarCtg.disable();
      } else {
        aceptarSinConfirmarCtg.valueChanges.pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
          .subscribe((value: boolean) => {
            if (value) {
              confirmadoManualmente.reset();
              confirmadoManualmente.disable();
            } else if (value === false) {
              confirmadoManualmente.enable();
            }
          });
      }
    }
  }
  protected subscribeCambioProducto(): void {
    const productoCtrl = this.fcService.getControl('datosDocumento.producto');
    if (productoCtrl) {
      productoCtrl.valueChanges.pipe(
        distinctUntilChanged(), takeUntil(this.onDestroy)
      ).subscribe((value: Producto) => {
        if (value) {
          this.obtenerProducto(value.id);
        }
      });
    }
  }

  protected subscribeCambioSustentabilidad(): void {
    const sustentabilidadCtrl = this.fcService.getControl('datosDocumento.sustentabilidad');
    if (sustentabilidadCtrl) {
      sustentabilidadCtrl.valueChanges.pipe(
        distinctUntilChanged(), takeUntil(this.onDestroy)
      ).subscribe((value: boolean) => {
        this.EsSustentable(value);
      });
    }
  }

  private productoSustentable(): void {
    this.parametrosTerminalService.getParametros().pipe(takeUntil(this.onDestroy))
          .subscribe((parametros: ParametrosTerminalDataView) => {
            if (!this.fcService.getValue('datosDocumento.sustentabilidad') &&
                this.esAltaValidacionCupo && !this.esConsulta) {
              this.fcService.setValue('datosDocumento.sustentabilidad', parametros.sustentabilidadPorDefectoParaSoja, false);
            }
            this.esConsulta ? this.fcService.disableControl('datosDocumento.sustentabilidad') : this.fcService.enableControl('datosDocumento.sustentabilidad');
          });
  }

  private EsSustentable( EsSustentable: boolean): void {
    const productoCtrl = this.fcService.getControl('datosDocumento.producto');
    let esSojaEPA = false;
    if (productoCtrl && productoCtrl.value) {
      esSojaEPA = (productoCtrl.value.id === Productos.SojaEPA);
    }
    this.fillCosecha = !EsSustentable;
    this.debeCompletarCosechaPorDefecto = EsSustentable;
    this.activarSeccionCampoEpa(EsSustentable || esSojaEPA);
  }

  private obtenerProducto(id: number): void {
    const userContext = this.authService.getUserContext();
    if (userContext && id > 0) {
      this.productoService.getProductoPorTerminal(id, userContext.terminal.id)
        .pipe(catchError((caught: Observable<void>) => {
          return caught;
        }))
        .subscribe((data: ProductosHablitadosPorTerminalDataView) => {
          if (data.usaSustentabilidad) {
            this.productoSustentable();
          } else {
            const esSojaEPA: boolean = (id === Productos.SojaEPA);
            this.fillCosecha = !esSojaEPA;
            this.debeCompletarCosechaPorDefecto = esSojaEPA;
            this.activarSeccionCampoEpa(esSojaEPA);
            if (!esSojaEPA) {
              this.limpiarSeccionCampoEpa();
            }
            this.fcService.setValue('datosDocumento.sustentabilidad', false, true);
            this.fcService.disableControl('datosDocumento.sustentabilidad');
          }
        });
    } else {
      this.fcService.setValue('datosDocumento.sustentabilidad', false, true);
      this.fcService.disableControl('datosDocumento.sustentabilidad');
    }
  }

  private limpiarSeccionCampoEpa(): void {
    this.fcService.setValue('datosDocumento.titularCartaPorte', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.cosecha', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.campoEpa', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.procedencia', '', { onlySelf: true });
  }

  private subscribeCambioFinalidad(): void {
    const finalidadCtrl = this.fcService.getControl('datosDocumento.finalidad');
    const conCupoCtrl = this.fcService.getControl('cupo.conCupo');
    if (finalidadCtrl && conCupoCtrl) {
      finalidadCtrl.valueChanges
        .pipe(
          distinctUntilChanged((x, y) => (x && y) ? x.id === y.id : false),
          takeUntil(this.onDestroy)
        ).subscribe((finalidad: Finalidad) => {
          this.finalidad = finalidad;
          this.fcService.setValue('datosDocumento.motivoCupo', undefined);
          this.autocompleteSedeService.idFinalidad = finalidad ? finalidad.id : null;
          if (finalidad) {
            if (conCupoCtrl && !conCupoCtrl.value && finalidad && finalidad.id === TipoFinalidad.Transferencia) {
              this.fcService.setValue('datosDocumento.sedeOrigen', new Sede(1, '1', '1 - Buenos Aires'), { onlySelf: false });
            } else {
              this.fcService.setValue('datosDocumento.sedeOrigen', null, { onlySelf: false });
            }
          }
        });
    }
  }

  protected activarSeccionCampoEpa(activar: boolean): void {
    this.fillCampoEpa = activar;
    if (!this.esConsulta) {
      if (activar) {
        this.fcService.enableControl('datosDocumento.campoEpa');
        if (!this.esCartaPorteElectronica) {
          this.fcService.enableControl('datosDocumento.titularCartaPorteSojaEPA');
        }
      } else {
        this.fcService.disableControl('datosDocumento.campoEpa');
        this.fcService.disableControl('datosDocumento.titularCartaPorteSojaEPA');
        this.fcService.disableControl('datosDocumento.cosecha');
        this.fcService.disableControl('datosDocumento.procedencia');
        this.limpiarSeccionCampoEpa();
      }
    }
  }

  protected subscribeCambioCampoEpaSustentable(): void {
    const campoEpaCtl = this.fcService.getControl('datosDocumento.campoEpa');
    if (campoEpaCtl) {
      campoEpaCtl.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((campoEpa: CampoEpaSustentable) => {
        if (campoEpa) {
          if (!this.esConsulta) {
            this.fcService.setValue('datosDocumento.procedencia', campoEpa.ciudad, { onlySelf: true, emitEvent: false });
            this.fcService.setValue('datosDocumento.cosecha', campoEpa.cosecha, { onlySelf: true, emitEvent: false });
          }
        }
      });
    }
  }

  private subscribeCambioVendedor() {
    const vendedorCtl = this.fcService.getControl('datosDocumento.vendedor');
    if (vendedorCtl) {
      vendedorCtl.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((vendedor: Vendedor) => {
        this.autocompleteSedeService.idVendedor = vendedor ? vendedor.id : null;
        this.manejarSedeOrigen();
      });
    }
  }

  private manejarSedeOrigen() {
    const idVendedor = this.fcService.getValue('datosDocumento.vendedor');
    if (idVendedor && idVendedor === Sociedades.LDC) {
      this.fcService.enableControl('datosDocumento.sedeOrigen');
    } else {
      this.fcService.setValue('datosDocumento.sedeOrigen', null, { onlySelf: true });
      this.fcService.disableControl('datosDocumento.sedeOrigen');
    }
  }

  private loadDatosCupo(cupo: CodigoCupo): void {
    this.fcService.setValue(`datosDocumento.finalidad`, cupo.finalidad, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.producto`, cupo.producto, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.vendedor`, cupo.vendedor, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.corredorComprador`, cupo.corredorComprador, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.destinatario`, cupo.destinatario, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.motivoCupo`, cupo.motivo, { onlySelf: true });
    this.fcService.setValue(`datosDocumento.sedeOrigen`, cupo.sedeOrigen, { onlySelf: true });
  }

  private loadDatosMovimiento(movimiento: MovimientoCupo): void {
    this.confirmoCtg = movimiento.confirmoCtg;
    this.sinConfirmarCtg = movimiento.sinConfirmarCtg;
    this.fcService.setValue(`datosDocumento.finalidad`,
      movimiento.finalidad, { onlySelf: true },
      this.esConsulta || !!movimiento.codigoCupo);
    this.fcService.setValue(`datosDocumento.producto`,
      movimiento.producto, { onlySelf: true },
      this.esConsulta || movimiento.pasoCalado || !!movimiento.codigoCupo);
    this.fcService.setValue(`datosDocumento.corredorComprador`,
      movimiento.corredorComprador, { onlySelf: true },
      this.esConsulta || !!movimiento.codigoCupo);
    this.fcService.setValue(`datosDocumento.vendedor`,
      movimiento.vendedor, { onlySelf: true },
      this.esConsulta || (!!movimiento.codigoCupo && !!this.cupo.vendedor));
    this.fcService.setValue(`datosDocumento.destinatario`,
      movimiento.destinatario, { onlySelf: true },
      this.esConsulta || !!movimiento.codigoCupo);
    this.fcService.setValue(`datosDocumento.sedeOrigen`, movimiento.sedeVendedor, { onlySelf: true },
      this.esConsulta || (movimiento.vendedor && movimiento.vendedor.id !== Sociedades.LDC));

    this.fcService.setValue(`datosDocumento.titularCartaPorte`,
      movimiento.titular,
      { onlySelf: true },
      this.esConsulta || (movimiento.producto ? movimiento.producto.id !== Productos.SojaEPA : true));

    this.fcService.setValue(`datosDocumento.sustentabilidad`,
    movimiento.cartaSustentable != null,
    { onlySelf: true },
    this.esConsulta);

    if (movimiento.cartaSustentable) {
      this.fcService.setValue(`datosDocumento.campoEpa`,
      movimiento.cartaSustentable,
      { onlySelf: true },
      this.esConsulta);
    } else {
      this.fcService.setValue(`datosDocumento.campoEpa`,
      movimiento.campoEpaSustentable,
      { onlySelf: true },
      this.esConsulta || (movimiento.producto ? movimiento.producto.id !== Productos.SojaEPA : true));
    }
    this.fcService.setValue(`datosDocumento.cosecha`, movimiento.cosecha, { onlySelf: true }, true);
    this.fcService.setValue(`datosDocumento.procedencia`, movimiento.procedencia, { onlySelf: true }, true);

    this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.kilosNeto`,
      movimiento.kgsNeto,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG);
    this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.ctg`,
      movimiento.ctg,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG);

    this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg`,
      movimiento.codigoCancelacionCtg,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG ||
      movimiento.sinConfirmarCtg || this.AFIPAutomatico || !this.esCartaPorteElectronica);
    this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg`,
      movimiento.sinConfirmarCtg,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG || this.AFIPAutomatico);
      this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.confirmadoManualmente`,
      movimiento.confirmadoManualmente,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG || this.AFIPAutomatico);
    this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.transportista`,
      movimiento.transportista,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG);
    this.fcService.setValue(`datosDocumento.confirmacionArriboCtg.chofer`,
      movimiento.chofer,
      { onlySelf: true },
      this.esConsulta || movimiento.confirmoCtg || !this.tieneCaracteristicaDeCTG);

    this.fcService.setValue(`datosDocumento.motivoCupo`,
      movimiento.motivoCupo, { onlySelf: true },
      this.esConsulta || !!movimiento.codigoCupo);

    if (movimiento.turnoCircular) {
      this.turnoCircular = movimiento.turnoCircular;
    }
  }

  habilitarCTG(tieneCaracteristicaDeCTG: boolean): void {

    this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.ctg');
    this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.transportista');
    this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.chofer');
    this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.kilosNeto');
    this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    this.fcService.disableControl('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');

    if (this.esConsulta) {
      return;
    }


    if (tieneCaracteristicaDeCTG && (!this.movimiento || !this.movimiento.confirmoCtg)) {
      if (!this.esCartaPorteElectronica) {
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.ctg');
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.transportista');
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.chofer');
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.kilosNeto');
      }

      if (!this.AFIPAutomatico) {
        this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
        if (!this.movimiento || !this.movimiento.sinConfirmarCtg) {
          this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');
        }
      }
    }
  }
}
