import { Component, Input, AfterViewInit, OnInit, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Productos, Acciones, Actividades } from '../../../shared/enums/enums';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Terminal } from '../../../shared/data-models/terminal';
import { patenteCamionDistintaPatenteAcopladoValidator } from '../../shared/validators/patente.validator';
import { choferInhabilitadoValidator } from '../../shared/validators/buscadores.validator';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { DispositivoService } from '../../shared/services/dispositivo.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { DatosDocumentoCerealesComponent } from '../../shared/datos-documento-base/datos-documento-cereales.component';
import { searchValidator } from '../../../core/shared/super/search.validator';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { CartaPorteDatosDocumentoComponent } from './carta-porte-datos-documento/carta-porte-datos-documento.component';
import { kgsBrutosGreaterThanKgsTara } from '../../controlar-descarga-camion-insumos/datos-documento-transportes-varios/controlar-descarga-camion-transportes-varios.validator';
import { name } from '../../../core/rxjs/operators/name';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CupoService } from '../../shared/cupo/service/cupo.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { TurnoCircularDataView } from '../../../shared/data-models/turno-circular-data-view';
import { CorredorService } from '../../../shared/buscador-corredor/corredor.service';
import { FinalidadService } from '../../../shared/desplegable-finalidad/finalidad.service';
import { Corredor } from '../../../shared/data-models/corredor';
import { AuthService } from '../../../core/services/session/auth.service';
import { AdministrarProductosHabilitadosPorTerminalService } from '../../administrar-productos-habilitados-por-terminal/administrar-productos-habilitados-por-terminal.service';

@Component({
  selector: 'yrd-datos-documento-controlar-descarga-cereales',
  templateUrl: './datos-documento-controlar-descarga-cereales.component.html',
  styleUrls: ['./datos-documento-controlar-descarga-cereales.component.css'],
  providers: [FormComponentService]
})
export class DatosDocumentoControlarDescargaCerealesComponent
  extends DatosDocumentoCerealesComponent
  implements OnInit, AfterViewInit, OnChanges {

  @Input() circuito: Circuito;
  @Input() tipoProducto: TipoProducto;
  @Input() tipoTransporte: TipoTransporte;
  @Input() esCartaPorteElectronica = false;
  @Input() esConsulta = false;
  @Input() esAlta = false;
  @Input() debeDeshabilitarControlesPorMovimientoAplicadoEnSan = false;
  @Input() terminal: Terminal;
  @Input() falloAfip = false;
  @Input() movimiento: MovimientoCerealGrano;
  @Input() esFueraCircuito: boolean;
  @Input() mostrarEncabezado: true;
  @Input() maskRegex: Array<any>;
  @Input() formDocumentoPorte: FormGroup;
  @Input() confirmoCtg = false;
  @Input() esModificacionFueraDePuesto = false;
  @Input() movimientoPrecargado = false;
  @Output() blurObservaciones: EventEmitter<any> = new EventEmitter();
  @Output() esAfipAutomatico: EventEmitter<boolean> = new EventEmitter();
  @Output() recuperarDatoCpe: EventEmitter<any> = new EventEmitter();
  @ViewChild('cartaPorteDatosDocumento') cartaPorteDatosDocumento: CartaPorteDatosDocumentoComponent;
  datosDocumentoForm: FormGroup;
  maximo = 11;
  turnoCircular: TurnoCircularDataView;
  tieneAfipAutomatico: boolean;
  confirmoManualmente = false;
  private corredorCompradorDirecto: Corredor;

  constructor(fcService: FormComponentService,
    private readonly fb: FormBuilder,
    eventsNotifierService: DescargaEventsNotifierService,
    private readonly dispositivoService: DispositivoService,
    parametrosTerminalService: ParametrosTerminalService,
    apiService: ApiService,
    cupoService: CupoService,
    popupService: PopupService,
    corredorService: CorredorService,
    finalidadService: FinalidadService,
    public readonly authService: AuthService,
    public readonly productoPorTerminalService: AdministrarProductosHabilitadosPorTerminalService) {
    super(eventsNotifierService,
      parametrosTerminalService,
      fcService,
      apiService,
      cupoService,
      popupService,
      finalidadService,
      authService,
      productoPorTerminalService);

    this.tipoProducto = new TipoProducto(1, '');
    corredorService.getByCodigoRol('50000000253', 'Indistinto').pipe(takeUntil(this.onDestroy))
      .subscribe((data) => {
        this.corredorCompradorDirecto = data;
      });
  }

  ngOnChanges() {
    this.maximo = this.esCartaPorteElectronica ? 11 : 8;
  }

  setFocus() {
    setTimeout(() => {
      if (this.cartaPorteDatosDocumento) {
        this.cartaPorteDatosDocumento.setFocus();
      }
    }, 0);
  }

  setFocusSinDocumentoPorte() {
    setTimeout(() => {
      if (this.cartaPorteDatosDocumento) {
        this.cartaPorteDatosDocumento.setFocusSinDocumentoPorte();
      }
    }, 0);
  }

  ngOnInit() {
    this.dispositivoService.consultarAccion(Acciones.WSAFIP).subscribe(result => {
      this.tieneAfipAutomatico = result.esAutomatica;
      this.esAfipAutomatico.emit(result.esAutomatica);
    });
    this.createForm();
    super.subscribeFormInteraction();
    this.subscribeFormInteractionForCerales();
  }

  subscribeFormInteractionForCerales() {
    this.eventsNotifierService.habilitarCTG
      .pipe(name('eventsNotifierService-habilitarCTG'), takeUntil(this.onDestroy))
      .subscribe(() => {
        this.habilitarCTG();
      });
    this.suscribirCambiosCtg();
    this.suscribirConfirmadoManualmente();
    this.maximo = this.esCartaPorteElectronica ? 11 : 8;
    this.subscribeCambioFleteCorto();
    const ctg = this.datosDocumentoForm.get('confirmacionArriboCtg.ctg');
    if (ctg) {
      ctg.clearValidators();
      ctg.setValidators([Validators.minLength(this.maximo), Validators.required]);
    }
  }

  private suscribirConfirmadoManualmente(): void {
    const aceptarSinConfirmarCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const confirmadoManualmente = this.datosDocumentoForm.get('confirmacionArriboCtg.confirmadoManualmente');
    const codigoCancelacionCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.codigoCancelacionCtg');

    if (aceptarSinConfirmarCtg && confirmadoManualmente && codigoCancelacionCtg) {
      if (this.circuito && (this.esConsulta || this.circuito.poseeActividad(Actividades.ValidacionCupo))) {
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
              if (!this.esAlta && this.movimiento && !!this.movimiento.codigoCancelacionCTG) {
                confirmadoManualmente.disable();
              }
            }
            this.esConsulta ||
              (this.tieneAfipAutomatico && !this.falloAfip ||
                this.confirmoCtg ||
                this.confirmoManualmente) ?
              aceptarSinConfirmarCtg.disable() : aceptarSinConfirmarCtg.enable();
            if (!this.movimientoPrecargado &&
              !this.confirmoCtg &&
              this.movimiento &&
              !this.confirmoManualmente) { aceptarSinConfirmarCtg.enable(); }
          });
      }
    }
  }

  private suscribirCambiosCtg(): void {
    const aceptarSinConfirmarCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const codigoCancelacionCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.codigoCancelacionCtg');
    const confirmadoManualmente = this.datosDocumentoForm.get('confirmacionArriboCtg.confirmadoManualmente');

    if (aceptarSinConfirmarCtg && codigoCancelacionCtg && confirmadoManualmente) {
      if (this.esConsulta || (this.circuito && this.circuito.poseeActividad(Actividades.ValidacionCupo))) {
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
              confirmadoManualmente.disable();
            } else if (value === false) {
              if (!this.esAlta && !!this.movimiento && !!this.movimiento.codigoCancelacionCTG) {
                aceptarSinConfirmarCtg.disable();
              }
              confirmadoManualmente.enable();
              if (!this.esCartaPorteElectronica) {
                codigoCancelacionCtg.enable();
                codigoCancelacionCtg.updateValueAndValidity();
              }
            }
            this.esConsulta ||
              (this.tieneAfipAutomatico && !this.falloAfip) ||
              this.confirmoManualmente ?
              confirmadoManualmente.disable() : confirmadoManualmente.enable();

            if (!this.movimientoPrecargado &&
              !this.confirmoCtg &&
              this.movimiento &&
              !this.confirmoManualmente) { confirmadoManualmente.enable(); }
          });
      }
    }
  }

  ngAfterViewInit() {
    this.fcService.initialize(this.datosDocumentoForm);
    this.setearValoresPorDefecto();
    this.subscribirseCambiosDocumento();
  }

  resetForm() {
    this.fcService.resetForm({ emitEvent: true });
    this.createForm();
    this.fcService.initialize(this.datosDocumentoForm);
    this.setearValoresPorDefecto();
    this.subscribeFormInteractionForCerales();
    this.subscribirseCambiosDocumento();
  }

  createForm() {
    this.datosDocumentoForm = this.fb.group({
      idCodigoCupo: '',
      conCupo: { value: '', disabled: false },
      patentes: this.fb.group({
        patenteCamion: ['', Validators.compose([Validators.required])],
        patenteCamionOriginal: [{ value: '', disabled: true }],
        patenteAcoplado: ['', Validators.compose([Validators.required])],
      }, { validator: patenteCamionDistintaPatenteAcopladoValidator() }),
      estadoCupo: { value: '', disabled: true },
      motivoCupo: { value: '', disabled: true },
      usuarioCupoSAN: { value: '', disabled: true },
      estadoMovimiento: { value: undefined, disabled: true },
      fechaCarga: [new Date().toLocalISOString().substring(0, 10), Validators.required],
      codigoCupo: [{ value: '', disabled: true }, {
        validators: [Validators.maxLength(this.codigoCupoRegex.length),
        Validators.minLength(this.codigoCupoRegex.length),
        Validators.required], updateOn: 'blur'
      }],
      fechaVencimiento: [undefined, Validators.required],
      turnoPlaya: { value: '', disabled: true },
      numeroCEE: [{ value: '', disabled: this.esCartaPorteElectronica},
        Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(14)])],
      tarjeta: [{ value: '', disabled: true }],
      producto: [undefined, [Validators.required, searchValidator()]],
      tipoGrano: [{ value: '', disabled: true }],
      titularCartaPorte: [{ value: '', disabled: (this.tieneAfipAutomatico && this.esCartaPorteElectronica) || this.esConsulta },
        [Validators.required, searchValidator()]],
      vendedor: { value: undefined, disabled: true },
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
      fleteCargoLdc: [false],
      mercadoTermino: { value: undefined, disabled: true },
      tipoPesada: [{ id: 1 }, Validators.required],
      corredorVendedor: [undefined, searchValidator()],
      kilometrosRecorridos: ['', Validators.compose([Validators.required, Validators.min(1)])],
      entregador: [undefined, searchValidator()],
      tarifaReferencia: ['', Validators.compose([Validators.required, Validators.min(1)])],
      destinatario: [undefined, [Validators.required, searchValidator()]],
      tarifaTN: ['', Validators.compose([Validators.min(1), Validators.required])],
      intermediarioFlete: [undefined, searchValidator()],
      kilosBrutosTaraGroup: this.fb.group({
        kilosBruto: [{ value: null, disabled: false }, [Validators.required, Validators.min(1)]],
        kilosTara: [{ value: null, disabled: false }, [Validators.required, Validators.min(1)]],
      }, { validator: kgsBrutosGreaterThanKgsTara }),
      tipoCartaPorte: [{ id: 1 }, Validators.required],
      kilosNeto: [{ value: null, disabled: true }, Validators.required],
      finalidad: [{ id: 1 }, Validators.required],
      procedencia: [{ value: '', disabled: false }, Validators.required],
      sedeOrigen: [{ value: '', disabled: true }],
      destino: [{ value: this.terminal.codigoAfip, disabled: true }],
      sedeDestino: [{ value: this.terminal.sede, disabled: true }, Validators.required],
      confirmacionArriboCtg: this.fb.group({
        ctg: [
          { value: '', disabled: false },
          Validators.compose([Validators.required, Validators.pattern('[1-9][0-9]{0,7}'), Validators.min(1)])
        ],
        transportista: [{ value: undefined, disabled: this.circuitoContemplaCupo }, Validators.required],
        chofer: [{ value: undefined, disabled: this.circuitoContemplaCupo },
        [Validators.required, choferInhabilitadoValidator(), searchValidator()]],
        codigoCancelacionCtg: [
          { value: '', disabled: true },
          Validators.compose([Validators.required, Validators.min(1), Validators.max(9223372036854775807)])
        ],
        aceptarSinConfirmarCtg: { value: undefined, disabled: true },
        confirmadoManualmente: { value: undefined, disabled: true },
        fleteCorto: { value: null, disabled: this.esConsulta }
      }),
      observaciones: ['', Validators.maxLength(250)]
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.datosDocumentoForm, 'datosDocumentoForm');
  }

  habilitarCTG() {
    const ctg = this.datosDocumentoForm.get('confirmacionArriboCtg.ctg');
    const transportista = this.datosDocumentoForm.get('confirmacionArriboCtg.transportista');
    const chofer = this.datosDocumentoForm.get('confirmacionArriboCtg.chofer');
    if (ctg && transportista && chofer) {
      transportista.enable();
      chofer.enable();
      ctg.enable();
    }
    this.dispositivoService.consultarAccion(Acciones.WSAFIP).subscribe(result => {
      this.esAfipAutomatico.emit(result.esAutomatica);
      const aceptarSinConfirmar = this.datosDocumentoForm.get('confirmacionArriboCtg.aceptarSinConfirmarCtg');
      const codigoCancelacionCtg = this.datosDocumentoForm.get('confirmacionArriboCtg.codigoCancelacionCtg');
      if (result && aceptarSinConfirmar && codigoCancelacionCtg) {
        if (!result.esAutomatica && !this.esConsulta) {
          aceptarSinConfirmar.enable();
          if (!aceptarSinConfirmar.value) {
            codigoCancelacionCtg.enable();
          }
        } else {
          aceptarSinConfirmar.disable();
          codigoCancelacionCtg.disable();
        }
      }
    });
  }

  protected subscribirseCambiosDocumento(): void {
    super.subscribirseCambiosDocumento();
    this.subscribirseCambiosDocumentoCereales();
    this.subscribeKilos('kilosBrutosTaraGroup.kilosTara');
    this.subscribeKilos('kilosBrutosTaraGroup.kilosBruto');
  }

  private subscribeKilos(component: string): void {
    const componentCtrl = this.datosDocumentoForm.get(component);
    if (componentCtrl) {
      componentCtrl.valueChanges.pipe(takeUntil(this.onDestroy))
        .subscribe(value => this.determinarKilosNeto(value));
    }
  }

  private determinarKilosNeto(value: number) {
    if (value != null && value !== undefined) {
      this.calcularkilosNeto();
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

  private subscribeCambioFleteCorto() {
    const esFleteCortoCtrl = this.datosDocumentoForm.get('confirmacionArriboCtg.fleteCorto');

    if (esFleteCortoCtrl && !this.esConsulta) {
      esFleteCortoCtrl.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy)).subscribe((value: boolean) => {
        this.fcService.setValue('confirmacionArriboCtg.aceptarSinConfirmarCtg', '', { onlySelf: true }, value);
        this.fcService.setValue('confirmacionArriboCtg.codigoCancelacionCtg', '', { onlySelf: true }, value);
        this.fcService.setValue('intermediario', '', { onlySelf: true }, value);
        this.fcService.setValue('remitenteComercial', '', { onlySelf: true }, value);
        this.fcService.setValue('corredorVendedor', '', { onlySelf: true }, value);
        this.fcService.setValue('mercadoTermino', '', { onlySelf: true }, true);
        this.fcService.setValue('corredorComprador', value ? this.corredorCompradorDirecto : '', { onlySelf: true }, value);
      }
      );
    }
  }

  protected subscribeCambioNoLlevaEstablecimiento() {
    const noLlevaEstablecimiento = this.datosDocumentoForm.get('establecimiento.noLlevaEstablecimiento');
    const numeroEstablecimiento = this.datosDocumentoForm.get('establecimiento.numeroEstablecimiento');

    if (noLlevaEstablecimiento && numeroEstablecimiento) {
      noLlevaEstablecimiento.valueChanges.pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
        .subscribe((noLlevaEstablecimientoValue: boolean) => {
          if (noLlevaEstablecimientoValue) {
            numeroEstablecimiento.clearValidators();
            numeroEstablecimiento.updateValueAndValidity();
          } else {
            numeroEstablecimiento.setValidators(Validators.required);
            numeroEstablecimiento.updateValueAndValidity();
          }
        });
    }
  }

  private obtenerFechaFormateada(fecha: Date): string | undefined {
    return fecha ? new Date(fecha).toLocalISOString().substring(0, 10) : undefined;
  }

  loadMovimiento(movimiento: MovimientoCerealGrano) {
    this.movimiento = movimiento;
    this.codigoCupoAnterior = movimiento.codigoCupo;
    this.confirmoCtg = movimiento.confirmoCtg;
    this.confirmoManualmente = movimiento.confirmadoManualmente;

    const tieneCupo = !!movimiento.codigoCupo;
    const esModificacionYTieneCupo = tieneCupo && !this.esConsulta;

    const esConsultaOEsAplicadoEnSan =
      this.esConsulta || this.debeDeshabilitarControlesPorMovimientoAplicadoEnSan;

    this.fcService.setValue(`patentes.patenteAcoplado`, movimiento.patenteAcoplado, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`patentes.patenteCamion`, movimiento.patenteCamion, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`patentes.patenteCamionOriginal`, movimiento.patenteCamion, { onlySelf: true }, this.esConsulta);

    let fecha = this.obtenerFechaFormateada(movimiento.fechaCarga);
    this.fcService.setValue(`fechaCarga`, fecha, { onlySelf: true }, this.esConsulta);

    this.fcService.setValue(`idCodigoCupo`, movimiento.idCodigoCupo, { onlySelf: true });
    this.fcService.setValue(`estadoCupo`, movimiento.estadoCupo, { onlySelf: true });
    this.fcService.setValue(`usuarioCupoSAN`, movimiento.usuarioCupoSAN, { onlySelf: true }, true);

    setTimeout(() => {
      this.fcService.setValue(`conCupo`, !!movimiento.codigoCupo, { onlySelf: true }, this.esAlta && this.esConsulta);
      this.fcService.setValue('codigoCupo', movimiento.codigoCupo, { onlySelf: true });
    }, 0);

    const estadoMovimiento = movimiento.estado ? movimiento.estado.descripcion : '';
    this.fcService.setValue(`estadoMovimiento`, estadoMovimiento, { onlySelf: true });

    if (movimiento.codigoFiscalEstablecimiento) {
      this.fcService.setValue(`establecimiento.noLlevaEstablecimiento`, false, { onlySelf: true }, this.esConsulta);
    } else {
      this.fcService.setValue(`establecimiento.noLlevaEstablecimiento`, true, { onlySelf: true }, this.esConsulta);
    }

    this.fcService.setValue(`establecimiento.numeroEstablecimiento`,
      movimiento.codigoFiscalEstablecimiento, { onlySelf: false }, this.esConsulta || movimiento.codigoFiscalEstablecimiento === null);

    fecha = this.obtenerFechaFormateada(movimiento.fechaVencimiento);
    this.fcService.setValue(`fechaVencimiento`, fecha ? fecha : '', { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`turnoPlaya`, movimiento.turnoPlaya, { onlySelf: true });
    this.fcService.setValue(`numeroCEE`, movimiento.codigoEmisionElectronica, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`tarjeta`, movimiento.nroTarjeta, { onlySelf: true }, true);
    this.fcService.setValue(`tipoGrano`, movimiento.tipoGrano, { onlySelf: true });
    this.fcService.setValue(`fleteCargoLdc`, movimiento.fleteCargoLdc, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`mercadoTermino`, '', { onlySelf: true }, true);
    this.fcService.setValue(`tipoPesada`, movimiento.tipoPesada, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`kilometrosRecorridos`, movimiento.kmRecorridos, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`entregador`, movimiento.entregador, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`tarifaReferencia`, movimiento.tarifaFleteReferencia, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`tarifaTN`, movimiento.tarifaFletePorTn, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`intermediarioFlete`, movimiento.intermediarioFlete, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`kilosBrutosTaraGroup.kilosBruto`, movimiento.kgBruto, { onlySelf: true }, esConsultaOEsAplicadoEnSan);
    this.fcService.setValue(`kilosBrutosTaraGroup.kilosTara`, movimiento.kgTara, { onlySelf: true }, esConsultaOEsAplicadoEnSan);
    this.fcService.setValue(`kilosNeto`, movimiento.kgNeto, { onlySelf: true }, true);
    this.fcService.setValue(`finalidad`, movimiento.finalidad, { onlySelf: true }, esConsultaOEsAplicadoEnSan || esModificacionYTieneCupo);
    this.fcService.setValue(`tipoCartaPorte`, movimiento.tipoCartaPorte, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`confirmacionArriboCtg.ctg`, movimiento.codigoTrazabilidadGrano, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`confirmacionArriboCtg.transportista`, movimiento.transportista, { onlySelf: true });
    this.fcService.setValue(`confirmacionArriboCtg.chofer`, movimiento.chofer, { onlySelf: true });
    this.fcService.setValue(`observaciones`, movimiento.observaciones, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`cosecha`, movimiento.cosecha, { onlySelf: true }, this.esConsulta);
    this.fcService.setValue(`confirmacionArriboCtg.fleteCorto`, movimiento.esFleteCorto);
    this.fcService.setValue(`remitenteComercial`, movimiento.remitenteComercial, { onlySelf: false },
      esConsultaOEsAplicadoEnSan || movimiento.esFleteCorto);
    this.fcService.setValue(`intermediario`, movimiento.intermediario, { onlySelf: false },
      esConsultaOEsAplicadoEnSan || movimiento.esFleteCorto);
    this.fcService.setValue(`corredorVendedor`, movimiento.corredorVendedor, { onlySelf: true },
      esConsultaOEsAplicadoEnSan || movimiento.esFleteCorto);
    this.fcService.setValue(`corredorComprador`, movimiento.corredorComprador,
      { onlySelf: true },
      esConsultaOEsAplicadoEnSan || movimiento.esFleteCorto || esModificacionYTieneCupo);
    this.fcService.setValue(`motivoCupo`, movimiento.motivoCupo, { onlySelf: true });
    this.fcService.setValue(`titularCartaPorte`, movimiento.titular, { onlySelf: true }, esConsultaOEsAplicadoEnSan
      || movimiento.confirmoCtg);
    setTimeout(() => {
      this.fcService.setValue(`sedeDestino`, movimiento.sedeDestinatario, { onlySelf: true });
      this.fcService.setValue(`confirmacionArriboCtg.aceptarSinConfirmarCtg`, movimiento.sinConfirmarCtg, { onlySelf: true },
        this.esConsulta || movimiento.esFleteCorto || !!this.movimiento.codigoCancelacionCTG || this.tieneAfipAutomatico
        || this.movimiento.confirmoCtg || this.confirmoManualmente || this.esFueraCircuito);
      this.fcService.setValue(`confirmacionArriboCtg.codigoCancelacionCtg`, movimiento.codigoCancelacionCTG, { onlySelf: true },
        this.esConsulta || movimiento.esFleteCorto || this.movimiento.sinConfirmarCtg || this.tieneAfipAutomatico
        || this.esCartaPorteElectronica || this.movimiento.confirmoCtg);
      this.fcService.setValue('confirmacionArriboCtg.confirmadoManualmente',
        movimiento.confirmadoManualmente, { onlySelf: true }, this.esConsulta || movimiento.esFleteCorto || this.tieneAfipAutomatico
        || this.movimiento.confirmoCtg || this.confirmoManualmente || this.esFueraCircuito);
      this.fcService.setValue(`destinatario`, movimiento.destinatario,
        { onlySelf: true },
        esConsultaOEsAplicadoEnSan || esModificacionYTieneCupo);
      this.fcService.setValue(`producto`, movimiento.producto,
        { onlySelf: true },
        this.esConsulta || this.esFueraCircuito || esModificacionYTieneCupo);
      if (movimiento.producto) {
        if (movimiento.producto.id === Productos.SojaEPA) {
          this.fcService.setValue(`campoEpa`, movimiento.campoEpaSustentable, { onlySelf: true });
        } else if (movimiento.campoEpaSustentable) {
          this.fcService.setValue(`sustentabilidad`, true, { onlySelf: true });
          this.fcService.setValue(`campoEpa`, movimiento.campoEpaSustentable, { onlySelf: true });
        } else {
          this.fcService.setValue(`sustentabilidad`, false, { onlySelf: true });
        }
        this.fcService.setValue(`procedencia`,
          movimiento.procedencia,
          { onlySelf: true },
          this.esConsulta || movimiento.producto.id === Productos.SojaEPA);
      }
    }, 500);
    this.fcService.setValue(`vendedor`, movimiento.vendedor, { onlySelf: false }, true);
    this.fcService.setValue(`sedeOrigen`, movimiento.sedeVendedor, { onlySelf: true });

    if (movimiento.turnoCircular) {
      this.turnoCircular = movimiento.turnoCircular;
    }
  }

  getErroresOperadoresOncca(): string | null {
    const titularCartaPorte = this.datosDocumentoForm.get('titularCartaPorte');
    const intermediario = this.datosDocumentoForm.get('intermediario');
    const entregador = this.datosDocumentoForm.get('entregador');
    const remitenteComercial = this.datosDocumentoForm.get('remitenteComercial');
    const corredorComprador = this.datosDocumentoForm.get('corredorComprador');

    let mensajeError = '';

    if (titularCartaPorte && titularCartaPorte.value && titularCartaPorte.value.mensajeErrorOncca) {
      mensajeError += titularCartaPorte.value.mensajeErrorOncca + ' ';
    }

    if (intermediario && intermediario.value && intermediario.value.mensajeErrorOncca) {
      mensajeError += intermediario.value.mensajeErrorOncca + ' ';
    }

    if (entregador && entregador.value && entregador.value.mensajeErrorOncca) {
      mensajeError += entregador.value.mensajeErrorOncca + ' ';
    }

    if (remitenteComercial && remitenteComercial.value && remitenteComercial.value.mensajeErrorOncca) {
      mensajeError += remitenteComercial.value.mensajeErrorOncca + ' ';
    }

    if (corredorComprador && corredorComprador.value && corredorComprador.value.mensajeErrorOncca) {
      mensajeError += corredorComprador.value.mensajeErrorOncca + ' ';
    }

    return mensajeError;
  }

  private setearValoresPorDefecto(): void {
    this.setearDestinatarioPorDefecto(this.esConsulta, this.esFueraCircuito);
    this.obtenerKgsEstimadosPorDefecto(this.esAlta);
  }

  setFocusForPrecargaMovimiento(): void {
    setTimeout(() => {
      if (this.cartaPorteDatosDocumento) {
        this.cartaPorteDatosDocumento.setFocusSinDocumentoPorte();
      }
    }, 0);
  }

  onBlurObservaciones(): void {
    this.blurObservaciones.emit();
  }

  OnBlurRecuperarDatoCpe(): void {
    this.recuperarDatoCpe.emit();
  }
}
