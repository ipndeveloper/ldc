import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { DatosDocumentoBaseComponent } from '../../shared/datos-documento-base/datos-documento-base.component';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { TiposProducto, Sociedades, TipoFinalidad } from '../../../shared/enums/enums';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { Terminal } from '../../../shared/data-models/terminal';
import { AuthService } from '../../../core/services/session/auth.service';
import { EntityWithCode } from '../../../core/models/entity-with-code';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { kgsBrutosGreaterThanKgsTara } from '../datos-documento-transportes-varios/controlar-descarga-camion-transportes-varios.validator';
import { searchValidator } from '../../../core/shared/super/search.validator';
import { name } from '../../../core/rxjs/operators/name';
import { AutocompleteSedeService } from '../../shared/services/autocomplete-sede.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';

@Component({
  selector: 'yrd-datos-documento-insumos',
  templateUrl: './datos-documento-insumos.component.html',
  styleUrls: ['./datos-documento-insumos.component.css']
})
export class DatosDocumentoInsumosComponent
     extends DatosDocumentoBaseComponent
  implements OnInit, AfterViewInit {

  @Input() tipoProducto: TipoProducto;
  @Input() esModificacionFueraPuesto: boolean;
  @Input() esFueraCircuito: boolean;
  @Input() esConsulta = false;
  @Input() mostrarEncabezado = true;
  @Input() circuito: Circuito;
  terminal: Terminal;
  movimiento: Movimiento;
  datosDocumentoForm: FormGroup;
  autocompleteSedeOrigenService: AutocompleteSedeService;
  autocompleteSedeDestinoService: AutocompleteSedeService;

  validationMessagesKilosBrutos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosBruto),
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0'),
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, Resources.Labels.KilosTara),
  };

  validationMessagesKilosTara = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosTara),
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0'),
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.KilosTara, Resources.Labels.KilosBruto),
  };

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta)
  };

  validationMessagesObservaciones = {
    maxlength: Resources.Messages.DebeIngresarMenosDeXCaracteres.format('100')
  };

  validationMessagesVendedor = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Vendedor),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesTransportista = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Transportista),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoCorrespondeAlCircuito
  };

  validationMessagesSedeOrigen = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SedeOrigen),
    searchValueNotValid: Resources.Messages.LasSedeIngresadaNoExiste
  };

  constructor(private readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly finalidadService: FinalidadService,
              eventsNotifierService: DescargaEventsNotifierService,
              parametrosTerminalService: ParametrosTerminalService,
              authService: AuthService,
              apiService: ApiService) {

    super(eventsNotifierService,
          parametrosTerminalService,
          fcService);

    this.tipoProducto = new TipoProducto(TiposProducto.Insumos, '');

    const userContext = authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }

    this.autocompleteSedeOrigenService = new AutocompleteSedeService(apiService);
    this.autocompleteSedeOrigenService.esOrigen = true;

    this.autocompleteSedeDestinoService = new AutocompleteSedeService(apiService);
    this.autocompleteSedeDestinoService.esOrigen = false;
  }

  ngOnInit() {
    this.createForm();
    this.subscribeFormInteraction();
  }

  ngAfterViewInit() {
    this.setearValoresPorDefecto();
    this.subscribeToFormChanges();
    this.manejarSedeDestino();
  }

  protected createForm() {
    this.datosDocumentoForm = this.fb.group({
      producto: [{ value: undefined, disabled: false }, [Validators.required, searchValidator()]],
      estado: [{ value: '', disabled: true }],
      tarjeta: { value: '', disabled: false },
      patentes: this.fb.group({
        patenteCamion: [{ value: null, disabled: false }, [Validators.required, Validators.minLength(6), Validators.maxLength(8)]],
        patenteAcoplado: [{ value: '', disabled: true }]
      }),
      kilosBrutosTaraGroup: this.fb.group({
        kilosBruto: [{ value: null, disabled: false }, [Validators.required, Validators.min(1)]],
        kilosTara: [{ value: null, disabled: false }, [Validators.required, Validators.min(1)]],
      }, { validator: kgsBrutosGreaterThanKgsTara }),
      kilosNeto: [{ value: null, disabled: true }],
      vendedor: [{ value: undefined, disabled: false }, [Validators.required, searchValidator()]],
      transportista: [{ value: undefined, disabled: false }, Validators.required],
      observaciones: [{ value: undefined, disabled: false }, Validators.maxLength(100)],
      destinatario: [{ value: '', disabled: true }, [Validators.required, searchValidator()]],
      finalidad: { value: '', disabled: true },
      sedeVendedor: [{ value: '', disabled: true }, [Validators.required, searchValidator()]],
      sedeDestinatario: [{ value: this.terminal.sede, disabled: true }, [searchValidator()]],
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.datosDocumentoForm, 'datosDocumentoForm');
  }

  resetForm(): void {
    this.fcService.resetForm({emitEvent: true});
    this.createForm();
    this.setearValoresPorDefecto();
    this.subscribeToFormChanges();
  }

  loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.movimiento = movimiento;
    this.fcService.setValue(`datosDocumento.patentes.patenteCamion`, movimiento.patenteCamion, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`datosDocumento.tarjeta`, movimiento.nroTarjeta, {onlySelf: true}, true);
    this.fcService.setValue(`datosDocumento.kilosBrutosTaraGroup.kilosBruto`, movimiento.kgBruto, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`datosDocumento.kilosBrutosTaraGroup.kilosTara`, movimiento.kgTara, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`datosDocumento.kilosNeto`, movimiento.kgNeto, {onlySelf: true}, true);
    this.fcService.setValue(`datosDocumento.vendedor`, movimiento.vendedor, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`datosDocumento.transportista`, movimiento.transportista, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`datosDocumento.observaciones`, movimiento.observaciones, {onlySelf: true}, this.esConsulta);
    this.fcService.setValue(`datosDocumento.tarjeta`, movimiento.nroTarjeta, {onlySelf: true}, true);
    this.fcService.setValue(`datosDocumento.destinatario`, movimiento.destinatario, {onlySelf: true}, true);
    this.fcService.setValue(`datosDocumento.sedeDestinatario`, movimiento.sedeDestinatario, {onlySelf: true}, true);

    setTimeout(() => {
      this.fcService.setValue(`datosDocumento.producto`, movimiento.producto, {onlySelf: false}, this.esConsulta || this.esFueraCircuito);
      this.fcService.setValue(`datosDocumento.finalidad`, movimiento.finalidad, {onlySelf: true}, true);
      this.fcService.setValue(`datosDocumento.sedeVendedor`, movimiento.sedeVendedor, {onlySelf: true}, true);
    }, 0);
  }

  private subscribeToFormChanges() {
    this.subscribeKilosTara();
    this.subscribeKilosBruto();
    this.subscribeVendedor();
    this.subscribeFinalidad();
    this.subscribeCambioSedeOrigen();
  }

  private subscribeKilosTara(): void {
    const kilosTara = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosTara');
    if (kilosTara) {
      kilosTara.valueChanges
        .pipe(name('datos-documentos-insumos.kilosBrutosTaraGroup.kilosTara'))
        .subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private subscribeKilosBruto(): void {
    const kilosBruto = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosBruto) {
      kilosBruto.valueChanges
        .pipe(name('datos-documentos-insumos.kilosBrutosTaraGroup.kilosBruto'))
        .subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private determinarKilosNeto(value: number) {
    if (value != null && value !== undefined) {
      this.calcularkilosNeto();
    }
  }

  protected manejarSedeOrigen() {
    const vendedorCtrl = this.datosDocumentoForm.get('vendedor');
    const finalidadCtrl = this.datosDocumentoForm.get('finalidad');
    if (vendedorCtrl && finalidadCtrl) {
      const idFinalidad = finalidadCtrl.value.id;
      const vendedorEsLDC = vendedorCtrl.value && vendedorCtrl.value.id === Sociedades.LDC;

      if (vendedorEsLDC) {
        this.finalidadService.getTipoFinalidad(idFinalidad)
        .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe(tipoFinalidad => {
          const sedeOrigenCtrl = this.fcService.getControl('datosDocumento.sedeVendedor');
          if (sedeOrigenCtrl) {
            if (!this.esConsulta &&
              (tipoFinalidad === TipoFinalidad.CompraVenta || tipoFinalidad === TipoFinalidad.Transferencia)) {
              this.fcService.enableControl('datosDocumento.sedeVendedor');
              sedeOrigenCtrl.setValidators(Validators.required);
              sedeOrigenCtrl.updateValueAndValidity();
            } else {
              sedeOrigenCtrl.clearValidators();
              if (!this.esConsulta) {
                this.fcService.setValue('datosDocumento.sedeVendedor', '');
              }
              sedeOrigenCtrl.updateValueAndValidity();
              this.fcService.disableControl('datosDocumento.sedeVendedor');
            }
          }
        });
      }
    }
  }

  protected manejarSedeDestino() {
    this.fcService.setValue('datosDocumento.sedeDestinatario', this.terminal.sede, {onlySelf: true});
    if (this.esConsulta || !this.terminal.puerto.esAcopio) {
      this.fcService.disableControl('datosDocumento.sedeDestinatario');
    } else {
      this.fcService.enableControl('datosDocumento.sedeDestinatario');
    }
  }

  private subscribeVendedor() {
    const vendedorCtl = this.datosDocumentoForm.get('vendedor');
    if (vendedorCtl) {
      vendedorCtl.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged(), name('datos-documentos-insumos.vendedor'))
        .subscribe((vendedor: EntityWithCode) => {
          this.autocompleteSedeOrigenService.idVendedor = vendedor ? vendedor.id : null;
          this.autocompleteSedeDestinoService.idVendedor = vendedor ? vendedor.id : null;
          if (vendedor) {
            if (vendedor.id !== Sociedades.LDC) {
              this.fcService.setValue('datosDocumento.finalidad', { id: TipoFinalidad.CompraVenta }, { onlySelf: true });
              const sedeOrigenCtrl = this.fcService.getControl('datosDocumento.sedeVendedor');
              if (sedeOrigenCtrl) {
                sedeOrigenCtrl.clearValidators();
                if (!this.esConsulta) {
                  this.fcService.setValue('datosDocumento.sedeVendedor', '');
                }
                sedeOrigenCtrl.updateValueAndValidity();
                this.fcService.disableControl('datosDocumento.sedeVendedor');
              }
            } else {
              this.fcService.setValue('datosDocumento.finalidad', { id: TipoFinalidad.Transferencia }, { onlySelf: true });
            }
          } else {
            this.fcService.setValue('datosDocumento.finalidad', null, { onlySelf: true });
          }
          this.manejarSedeOrigen();
        });
    }
  }

  private subscribeFinalidad() {
    const finalidadCtl = this.datosDocumentoForm.get('finalidad');
    if (finalidadCtl) {
      finalidadCtl.valueChanges
        .pipe(takeUntil(this.onDestroy), distinctUntilChanged(), name('datos-documentos-insumos.finalidad'))
        .subscribe((finalidad: EntityWithDescription) => {
          this.autocompleteSedeOrigenService.idFinalidad = finalidad ? finalidad.id : null;
          this.autocompleteSedeDestinoService.idFinalidad = finalidad ? finalidad.id : null;
          this.manejarSedeOrigen();
        });
    }
  }

  protected subscribeCambioSedeOrigen() {
    const sedeOrigen = this.datosDocumentoForm.get('sedeVendedor');

    if (sedeOrigen) {
      sedeOrigen.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy)).subscribe(value => {
        this.autocompleteSedeDestinoService.idSedeOrigen = value ? value.id : null;
      });
    }
  }

  private calcularkilosNeto(): void {
    const kilosTara = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosTara');
    const kilosBruto = this.datosDocumentoForm.get('kilosBrutosTaraGroup.kilosBruto');
    if (kilosTara && kilosBruto &&
        kilosTara.value != null && kilosTara.value !== undefined &&
        kilosBruto.value != null && kilosBruto.value !== undefined) {
      this.datosDocumentoForm.patchValue({ kilosNeto: +kilosBruto.value - +kilosTara.value });
    }
  }

  private setearValoresPorDefecto(): void {
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito, 'datosDocumento.destinatario');
    this.obtenerKgsEstimadosPorDefecto(this.esAlta, 'datosDocumento.kilosBrutosTaraGroup');
  }
}
