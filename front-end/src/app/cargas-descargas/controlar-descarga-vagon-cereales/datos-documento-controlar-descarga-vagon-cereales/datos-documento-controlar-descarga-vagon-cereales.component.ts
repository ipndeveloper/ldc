import { Component, OnInit, AfterViewInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { Resources } from '../../../../locale/artifacts/resources';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { Productos, Acciones } from '../../../shared/enums/enums';
import { DatosDocumentoVagonBaseComponent } from '../../shared/datos-documento-base/datos-documento-vagon-base.component';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { searchValidator } from '../../../core/shared/super/search.validator';
import { kgsBrutosGreaterThanKgsTara } from '../../controlar-descarga-camion-insumos/datos-documento-transportes-varios/controlar-descarga-camion-transportes-varios.validator';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CupoService } from '../../shared/cupo/service/cupo.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';

@Component({
  selector: 'yrd-datos-documento-controlar-descarga-vagon-cereales',
  templateUrl: './datos-documento-controlar-descarga-vagon-cereales.component.html',
  styleUrls: ['./datos-documento-controlar-descarga-vagon-cereales.component.css'],
  providers: [FormComponentService]
})
export class DatosDocumentoControlarDescargaVagonCerealesComponent
    extends DatosDocumentoVagonBaseComponent<MovimientoCerealGrano>
    implements OnInit, AfterViewInit, OnChanges {
  @Output() esAfipAutomatico: EventEmitter<boolean> = new EventEmitter();
  @Input() esRegimenElectronico = false;
  @Input() confirmoCtg = false;
  @Input() confirmadoManualmente = false;

  tieneAfipAutomatico = false;

  validationMessagesKilometrosRecorridos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilometrosRecorridos),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilometrosRecorridos, '0')
  };

  validationMessagesOperativo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Operativo),
  };

  validationMessagesSedeOrigen = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SedeOrigen),
  };

  validationMessagesTarifaReferencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TarifaDeReferencia),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.TarifaDeReferencia, '0')
  };

  validationMessagestarifaTN = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TarifaTN),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.TarifaTN, '0')
  };

  validationMessagesCorredorComprador = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CorredorComprador),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesDestinatario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destinatario),
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesProcedencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Procedencia)
  };

  validationMessagesCorredorVendedor = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  validationMessagesIntermediarioFlete = {
    searchValueNotValid: Resources.Messages.ElCuitIngresadoNoEsValido
  };

  fillCosecha: boolean;
  fillCampoEpa: boolean;
  consultoAfip = false;

  constructor(protected readonly fcService: FormComponentService,
              private readonly fb: FormBuilder,
              private readonly dispositivoService: DispositivoService,
              eventsNotifierService: DescargaEventsNotifierService,
              parametrosTerminalService: ParametrosTerminalService,
              apiService: ApiService,
              cupoService: CupoService,
              popupService: PopupService,
              finalidadService: FinalidadService,
              public readonly authService: AuthService,
              public readonly productoPorTerminalService: AdministrarProductosHabilitadosPorTerminalService) {

    super(fcService,
          eventsNotifierService,
          parametrosTerminalService,
          apiService,
          cupoService,
          popupService,
          finalidadService,
          authService,
          productoPorTerminalService);

    this.tipoProducto = new TipoProducto(1, '');
  }

  ngOnInit() {
    this.dispositivoService.consultarAccion(Acciones.WSAFIP).subscribe(result => {
      this.tieneAfipAutomatico = result.esAutomatica;
      this.esAfipAutomatico.emit(result.esAutomatica);
    });
    this.createForm();
    this.subscribeFormInteraction();
  }

  ngAfterViewInit() {
    this.fcService.initialize(this.datosDocumentoForm);
    this.subscribirseCambiosDocumento();
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.esRegimenElectronico && changes.esRegimenElectronico.currentValue && !this.esAlta && !this.esFueraCircuito) {
      this.completarPesaje(this.movimiento);
    }
  }

  resetForm() {
    super.resetForm();
    this.subscribirseCambiosDocumentoCereales();
    this.movimiento = undefined as any;
  }

  createForm() {
    this.datosDocumentoForm = this.fb.group({
      estadoMovimiento: { value: undefined, disabled: true },
      fechaCarga: [new Date().toLocalISOString().substring(0, 10), Validators.required],
      fechaVencimiento: [undefined, Validators.required],
      numeroCEE: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      producto: [undefined, [Validators.required, searchValidator()]],
      tipoGrano: [{value: '', disabled: true} ], // Campo Readonly
      titularCartaPorte: [undefined, [Validators.required, searchValidator()]],
      opONCCATitular: { value: '', disabled: true },
      vendedor: { value: undefined, disabled: true },
      opONCCAVendedor: { value: '', disabled: true },
      establecimiento: this.fb.group({
        noLlevaEstablecimiento: { value: true, disabled: this.esConsulta },
        numeroEstablecimiento: [{ value: undefined, disabled: true }, Validators.min(0)],
      }),
      sustentabilidad: { value: false, disabled: true },
      campoEpa: [{ value: '', disabled: true }, Validators.required],
      cosecha: [undefined, Validators.required],
      intermediario: [undefined, searchValidator()],
      opONCCAIntermediario: { value: '', disabled: true },
      remitenteComercial: [undefined, searchValidator()],
      opONCCARemitenteComercial: { value: '', disabled: true },
      corredorComprador: [undefined, [Validators.required, searchValidator()]],
      mercadoTermino: {value: undefined, disabled: true},
      corredorVendedor: [undefined, searchValidator()],
      kilometrosRecorridos: ['', Validators.compose([Validators.required, Validators.min(1)])],
      entregador: [undefined, searchValidator()],
      tarifaReferencia: ['', Validators.compose([Validators.required, Validators.min(1)])],
      destinatario: [this.destinatarioPorDefecto, [Validators.required, searchValidator()]],
      tarifaTN: ['', Validators.compose([ Validators.min(1), Validators.required])],
      intermediarioFlete: [undefined, searchValidator()],
      transportista: [{value: undefined, disabled: false}, [Validators.required]],
      ferrocarril: [{value: undefined, disabled: false}, Validators.required],
      operativo: [{value: '', disabled: false}, Validators.required],
      finalidad: [{id: 1}, Validators.required],
      procedencia: [{value: '', disabled: false}, Validators.required ],
      sedeOrigen: [{value: '', disabled: true}, Validators.required ],
      destino: [{value: this.terminal.codigoAfip, disabled: true}],
      sedeDestino: [{value: this.terminal.sede, disabled: true} ],
      observaciones: ['', Validators.maxLength(250)],
      confirmacionArriboCtg: this.fb.group({
        codigoCancelacionCtg: [
          { value: '', disabled: true },
          Validators.compose([Validators.required, Validators.min(1), Validators.max(9223372036854775807)])
        ],
        aceptarSinConfirmarCtg: { value: undefined, disabled: true },
        confirmadoManualmente: { value: undefined, disabled: true },
      }),
      datosVagon: this.fb.group({
        numeroVagon:  ['', Validators.required],
        kilosBrutosTaraGroup: this.fb.group({
          kilosBruto: [{value: '', disabled: this.esConsulta},
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^\d+$/),
            Validators.max(2147483647)
          ]],
          kilosTara: [{value: '', disabled: this.esConsulta},
          [
            Validators.required,
            Validators.min(1),
            Validators.pattern(/^\d+$/),
            Validators.max(2147483647) // VAL034
          ]],
        }, { validator: kgsBrutosGreaterThanKgsTara }),
        kilosNeto: [{value: '', disabled: true}, Validators.required ],
        tarjeta: [{ value: '', disabled: true }],
        fechaEntrada: [{value: '', disabled: true}],
        fechaOperacion: [{value: '', disabled: true}],
        fechaSalida: [{value: '', disabled: true}],
      })
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.datosDocumentoForm, 'datosDocumentoForm');
  }

  //#region Subscripciones

  protected subscribirseCambiosDocumento(): any {
    super.subscribirseCambiosDocumento();
    this.subscribirseCambiosDocumentoCereales();
    this.suscribirCambiosCtg();
    this.suscribirConfirmadoManualmente();
  }

  //#endregion


  loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.confirmoCtg = movimiento.confirmoCtg;
    this.confirmadoManualmente = movimiento.confirmadoManualmente;
    this.consultoAfip = movimiento.consultoAfip;
    this.movimiento = movimiento;
    super.loadMovimiento(movimiento);
    this.fcService.setValue(`establecimiento.noLlevaEstablecimiento`,
                            !movimiento.codigoFiscalEstablecimiento,
                            { onlySelf: true },
                            this.debeHabilitarCampo());

    this.fcService.setValue(`establecimiento.numeroEstablecimiento`,
                            movimiento.codigoFiscalEstablecimiento,
                            { onlySelf: true },
                            this.esConsulta || movimiento.codigoFiscalEstablecimiento === null);

    this.fcService.setValue(`tipoGrano`, movimiento.tipoGrano, {onlySelf: true});
    this.fcService.setValue(`corredorVendedor`, movimiento.corredorVendedor, {onlySelf: true},
      this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`numeroCEE`, movimiento.codigoEmisionElectronica, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`kilometrosRecorridos`, movimiento.kmRecorridos, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`tarifaReferencia`, movimiento.tarifaFleteReferencia, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`tarifaTN`, movimiento.tarifaFletePorTn, {onlySelf: true}, this.debeHabilitarCampo());
    this.fcService.setValue(`intermediarioFlete`, movimiento.intermediarioFlete, {onlySelf: true},
      this.debeHabilitarCampo() || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan);
    this.fcService.setValue(`tipoCartaPorte`, movimiento.tipoCartaPorte, {onlySelf: true}, this.debeHabilitarCampo());
    if (movimiento.producto) {
      if (movimiento.producto.id === Productos.SojaEPA) {
        this.fcService.setValue(`campoEpa`,
                                movimiento.campoEpaSustentable,
                                {onlySelf: true},
                                this.debeHabilitarCampo());
      } else if (movimiento.producto.id === Productos.Soja && movimiento.campoEpaSustentable) {
        this.fcService.setValue(`sustentabilidad`,
                                true,
                                {onlySelf: true},
                                this.debeHabilitarCampo());
        this.fcService.setValue(`campoEpa`, movimiento.campoEpaSustentable, {onlySelf: true}, this.debeHabilitarCampo());
      } else {
        this.fcService.setValue(`sustentabilidad`,
                                false,
                                {onlySelf: true},
                                this.debeHabilitarCampo() || movimiento.producto.id !== Productos.Soja);
      }
    }
    setTimeout(() => {
      this.fcService.setValue('confirmacionArriboCtg.aceptarSinConfirmarCtg', movimiento.sinConfirmarCtg, { onlySelf: true },
        this.esConsulta || movimiento.esFleteCorto || !!this.movimiento.codigoCancelacionCTG || this.tieneAfipAutomatico
        || this.movimiento.confirmoCtg || this.confirmadoManualmente || !this.esRegimenElectronico);
      this.fcService.setValue('confirmacionArriboCtg.codigoCancelacionCtg', movimiento.codigoCancelacionCTG, { onlySelf: true },
        this.esConsulta || movimiento.esFleteCorto || this.movimiento.sinConfirmarCtg || this.tieneAfipAutomatico
        || this.esRegimenElectronico || this.movimiento.confirmoCtg || !this.esRegimenElectronico);
      this.fcService.setValue('confirmacionArriboCtg.confirmadoManualmente',
        movimiento.confirmadoManualmente, { onlySelf: true }, this.esConsulta || movimiento.esFleteCorto || this.tieneAfipAutomatico
        || this.movimiento.confirmoCtg || this.confirmadoManualmente || !this.esRegimenElectronico);
    }, 500);
  }

  protected manejarSedeOrigen(): void {
    if (!this.esAlta && this.debeHabilitarCampo()) {
      this.fcService.disableControl('sedeOrigen');
    } else {
      super.manejarSedeOrigen();
    }
  }

  private suscribirConfirmadoManualmente(): void {
    const aceptarSinConfirmarCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const confirmadoManualmente = this.datosDocumentoForm.get('confirmacionArriboCtg.confirmadoManualmente');
    const codigoCancelacionCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.codigoCancelacionCtg');

    if (aceptarSinConfirmarCtg && confirmadoManualmente && codigoCancelacionCtg) {
        confirmadoManualmente.valueChanges.pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
          .subscribe((value: boolean) => {
            if (value) {
              aceptarSinConfirmarCtg.reset();
              codigoCancelacionCtg.reset();
              codigoCancelacionCtg.disable();
            }
          });
    }
  }

  private suscribirCambiosCtg(): void {
    const aceptarSinConfirmarCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const codigoCancelacionCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.codigoCancelacionCtg');
    const confirmadoManualmente = this.datosDocumentoForm.get('confirmacionArriboCtg.confirmadoManualmente');

    if (aceptarSinConfirmarCtg && codigoCancelacionCtg && confirmadoManualmente) {
      if (this.esConsulta) {
        aceptarSinConfirmarCtg.disable();
        codigoCancelacionCtg.disable();
      } else {
        aceptarSinConfirmarCtg.valueChanges.pipe(
          distinctUntilChanged(),
          takeUntil(this.onDestroy)
        )
          .subscribe((value: boolean) => {
            if (value) {
              codigoCancelacionCtg.reset();
              codigoCancelacionCtg.disable();
              confirmadoManualmente.reset();
            }
          });
      }
    }
  }

  debeDeshabilitarTitular(): boolean {
    return (this.confirmoCtg
      || this.consultoAfip
      || this.confirmadoManualmente
      || (!this.esModificacionDocPorte && this.tieneAfipAutomatico))
      && !this.esFueraCircuito;
  }
}

