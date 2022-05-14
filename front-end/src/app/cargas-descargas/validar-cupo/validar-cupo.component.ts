import { Component, OnInit, AfterViewInit, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { FormComponentService } from '../../core/services/formComponent/formComponent.service';
import { TiposMovimientoEtiqueta, TiposMovimiento, Actividades, Caracteristicas, MotivosEstadoMovimiento, TiposProducto, ComportamientoAfip, Productos } from '../../shared/enums/enums';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { AuthService } from '../../core/services/session/auth.service';
import { Terminal } from '../../shared/data-models/terminal';
import { TipoProducto, tiposProducto, EntitiesTiposProducto } from '../../shared/data-models/tipo-producto';
import { distinctUntilChanged, takeUntil, catchError } from 'rxjs/operators';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { conformToMask } from 'text-mask-core';
import { TipoTransporte, EntitiesTiposTransporte } from '../../shared/data-models/tipo-transporte';
import { CupoService } from '../shared/cupo/service/cupo.service';
import { CodigoCupo } from '../../shared/data-models/codigo-cupo';
import { CircuitoService } from '../shared/services/circuito.service';
import { DocumentoPorteComponent } from '../shared/documento-porte/documento-porte.component';
import { CupoComponent } from '../shared/cupo/cupo.component';
import { choferInhabilitadoValidator } from '../shared/validators/buscadores.validator';
import { searchValidator } from '../../core/shared/super/search.validator';
import { DatosDocumentoValidarCupoComponent } from './datos-documento-validar-cupo/datos-documento-validar-cupo.component';
import { CrearPreingresoCommand } from '../../shared/data-models/commands/cargas-descargas/crear-preingreso-command';
import { ValidarCupoService } from './service/validar-cupo.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Resources } from '../../../locale/artifacts/resources';
import { Collection } from '../../core/models/collection';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { Subject, Observable } from 'rxjs';
import { MovimientoCupo } from '../../shared/data-models/movimiento-cupo';
import { ModalMotivoComponent } from '../shared/modals/modal-motivo/modal-motivo.component';
import { MotivoEstadoMovimiento } from '../../shared/data-models/motivo-estado-movimiento';
import { ConsultarDatosAfipComponent } from '../../gestion-afip/consultar-datos-afip/consultar-datos-afip.component';
import { ModificarValidacionCupoFueraPuestoCommand } from '../../shared/data-models/commands/cargas-descargas/modificar-validacion-cupo-fuera-puesto-command';
import { EstadoVigenciaCupoDataView } from '../../shared/data-models/Estado-vigencia-cupo-data-view';
import { ModalAsignarTarjetaComponent } from '../shared/modals/modal-asignar-tarjeta/modal-asignar-tarjeta.component';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { ModalAutorizacionComponent } from '../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { Autorizacion } from '../shared/autorizacion/autorizacion';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { AnularCupoCommand } from '../../shared/data-models/commands/cargas-descargas/anular-cupo-command';
import { AnularCuposService } from '../gestionar-cupos/anular-cupos.service';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';
import { ModalComponent } from '../../core/components/modal/modal.component';
import { tiposMovimientos } from '../../shared/data-models/tipo-movimiento';
import { EstadoCupo } from '../../shared/data-models/estado-cupo';
import { TurnoCircularService } from '../shared/services/turno-circular.service';
import { BuscarTurnoCircularCommand as BuscarTurnoCircularQuery } from '../../shared/data-models/buscar-turno-circular.command';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';
import { ConsultarDatosAfipService } from '../../../app/gestion-afip/consultar-datos-afip/consultar-datos-afip-service';


@Component({
  selector: 'yrd-validar-cupo',
  templateUrl: './validar-cupo.component.html',
  styleUrls: ['./validar-cupo.component.css']
})
export class ValidarCupoComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('documentoPorte') documentoPorte: DocumentoPorteComponent;
  @ViewChild('cupoComponent') cupoComponent: CupoComponent;
  @ViewChild('datosDocumento') datosDocumento: DatosDocumentoValidarCupoComponent;
  @ViewChild('modalMotivo') modalMotivo: ModalMotivoComponent;
  @ViewChild('consultarDatosAfip') consultarDatosAfip: ConsultarDatosAfipComponent;
  @ViewChild('modalAsignarTarjeta') modalAsignarTarjeta: ModalAsignarTarjetaComponent;
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('modalConfirmacionAnulacion') modalConfirmacionAnulacion: ModalComponent;

  form: FormGroup;
  circuito: Circuito;
  falloAfip = false;
  terminal: Terminal;
  tipoProducto: TipoProducto = EntitiesTiposProducto.Cereal;
  tipoDocumentoPorte: TipoDocumentoPorte;
  esCartaPorteElectronica = false;
  tipoDocPorteRegex: Array<any>;
  fillCosecha: boolean;
  esConsulta = false;
  isLoading = false;
  fillCampoEpa: boolean;
  idActividad = Actividades.ValidacionCupo;
  cupo: CodigoCupo | null;
  cupoAnterior: CodigoCupo | null;
  tipoTransporte: TipoTransporte = EntitiesTiposTransporte.Camion;
  idMovimiento: number | null;
  movimiento: MovimientoCupo;
  estadoCupoDataView: EstadoVigenciaCupoDataView | null;
  esNavegacion = false;
  esCargaMovimientoNavegacion = false;
  showCTGData = false;
  validarCupoPath = 'ValidarCupo';
  gestionarCupoPath = 'GestionarCupos';
  autorizaciones: Autorizacion[];
  rolesAAutorizar: EntityWithDescription[][];
  estadosValidosParaAnular: number[];
  private readonly onDestroy = new Subject();
  ingresoConCupo = true;
  esCereal = true;
  ingresoSinCupo = true;
  tieneCaracteristicaDeCTG = false;
  tieneAFIPAutomatico = false;
  tieneCodigoCupoValido = true;
  confirmoCtg = false;
  consultoAfip = false;
  deseaConfirmarEstaAccionMessage = Resources.Messages.DeseaConfirmarEstaAccion;
  codigoCupoRegex = [/^[a-zA-Z]+$/, /^[a-zA-Z]+$/, /^[a-zA-Z]+$/, '-', /^[a-zA-Z]+$/, /^[a-zA-Z]+$/, /^[a-zA-Z]+$/, '-',
    /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/, '-', /[0-9 ]+/,
    /[0-9 ]+/, /[0-9 ]+/, /[0-9 ]+/];
  private esAceptar: boolean;

  get esAltaValidacionCupo(): boolean {
    return this.idActividad === Actividades.ValidacionCupo;
  }
  get esModificacionFueraPuesto(): boolean {
    return this.idActividad === Actividades.ModificarValidacionCupoFueraPuesto;
  }

  get esModificacionCupo(): boolean {
    return this.idActividad === Actividades.ModificarValidacionCupo;
  }

  constructor(private readonly fcService: FormComponentService,
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly cupoService: CupoService,
    private readonly circuitoService: CircuitoService,
    private readonly validarCupoService: ValidarCupoService,
    private readonly popupService: PopupService,
    private readonly navigationService: NavigationService,
    private readonly anularCuposService: AnularCuposService,
    private readonly estadoMovimientoService: EstadoMovimientoService,
    private readonly turnoCircularService: TurnoCircularService,
    private readonly servicioAfip: ConsultarDatosAfipService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
    this.tipoTransporte = EntitiesTiposTransporte.Camion;
  }

  ngOnInit(): void {
    this.createForm();
    this.subscribeControlChanges();
    this.estadosValidosParaAnular = this.completarestadosValidosParaModificar(Actividades.AnularValidacionCupo);
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
  }

  ngAfterViewInit(): void {
    this.documentoPorte.setFocus();
    this.tipoTransporte = EntitiesTiposTransporte.Camion;
  }

  private subscribeControlChanges(): void {
    this.subscribeNavigation();
    this.subscribeCambioTipoProducto();
    this.subscribeCambioTipoDocumento();
    this.subscribeCambioConCupo();
    this.subscribeCambioCodigoCupo();
  }

  private subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe(params => {
        if (params['idMovimiento']) {
          this.esNavegacion = true;
          this.esCargaMovimientoNavegacion = true;
          this.esConsulta = params['esModificacion'] === 'false';
          this.idMovimiento = params['idMovimiento'];
          if (params['idActividad']) {
            this.idActividad = +params['idActividad'];
          }

          if (params['idTipoProducto']) {
            const tipoProductoEnviadoPorNavegacion = tiposProducto.find(p => p.id === Number(params['idTipoProducto']));
            if (tipoProductoEnviadoPorNavegacion) {
              this.tipoProducto = tipoProductoEnviadoPorNavegacion;
              this.fcService.setValue('circuito.tipoProducto', this.tipoProducto, { onlySelf: true });
            }
          }
        }
      });
  }

  private buscarMovimiento(): void {
    this.isLoading = true;
    this.validarCupoService.getMovimiento(this.idMovimiento)
      .pipe(takeUntil(this.onDestroy),
        catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        })
      )
      .subscribe((movimiento: MovimientoCupo) => {
        this.isLoading = false;
        if (movimiento) {
          this.loadMovimiento(movimiento);
          this.obtenerEstadoCupo();
          this.esCargaMovimientoNavegacion = false;
        }
      });
  }

  private loadMovimiento(movimiento: MovimientoCupo): void {
    this.movimiento = movimiento;
    this.confirmoCtg = movimiento.confirmoCtg;
    this.consultoAfip = movimiento.consultoAfip;
    const usaSustentabilidad = movimiento.cartaSustentable !== null;
    if (movimiento.cupo) {
      this.cupo = new CodigoCupo();
      Object.assign(this.cupo, movimiento.cupo);
    }

    const confirmaCTG = this.circuito.debeActivarCaracteristica([Caracteristicas.ConfirmaCtgControlDescargaCereales]);

    this.fcService.setValue(`circuito.tipoProducto`,
      movimiento.tipoProducto,
      { onlySelf: true },
      this.esConsulta || this.esModificacionFueraPuesto);

    this.fcService.setValue('datosDocumento.confirmacionArriboCtg.ctg',
      movimiento.ctg,
      { onlySelf: true });

    this.fcService.setValue('documentoPorte.ctg',
      movimiento.ctg,
      { onlySelf: true });

    this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`,
      movimiento.nroDocumentoPorte,
      { onlySelf: true },
      this.esConsulta || (this.esModificacionFueraPuesto && confirmaCTG) || movimiento.confirmoCtg);

    this.fcService.setValue(`documentoPorte.tipoDocumentoPorte`,
      movimiento.tipoDocumentoPorte,
      { onlySelf: true },
      this.esConsulta || (this.esModificacionFueraPuesto && confirmaCTG) || movimiento.confirmoCtg);

    this.fcService.setValue(`documentoPorte.titularCartaPorteCPE`,
      movimiento.titular,
      { onlySelf: true },
      this.esConsulta);

    this.fcService.setValue(`datosDocumento.titularCartaPorteSojaEPA`,
      movimiento.titular,
      { onlySelf: true },
      this.esConsulta);

    this.fcService.setValue(`datosDocumento.sustentabilidad`,
      usaSustentabilidad,
      { onlySelf: true },
      this.esConsulta);

    this.fcService.setValue(`cupo.conCupo`, movimiento.codigoCupo ? true : false, { onlySelf: true }, this.esConsulta);

    this.fcService.setValue(`cupo.codigoCupo`, movimiento.codigoCupo,
      { onlySelf: true },
      this.esConsulta || !movimiento.codigoCupo);

    this.fcService.setValue(`cupo.usuarioSAN`, movimiento.usuarioCupoSAN, { onlySelf: true }, true);
  }

  private createForm(): void {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: [{ value: this.terminal.descripcion, disabled: true }],
        tipoMovimiento: [{ value: TiposMovimientoEtiqueta.Descarga, disabled: true }],
        tipoTransporte: [{ value: this.tipoTransporte.descripcion, disabled: true }],
        tipoProducto: [{ value: EntitiesTiposProducto.Cereal, disabled: false }]
      }),
      documentoPorte: this.fb.group({
        tipoDocumentoPorte: [{ value: '', disabled: this.esCereal }, Validators.required],
        numeroDocumentoPorte: [{ value: '', disabled: false }, {
          validators: Validators.required,
          updateOn: 'blur'
        }],
        titularCartaPorteCPE: [{ value: '', disabled: false }],
        ctg: [{ value: '', disabled: false },
        Validators.compose([Validators.required, Validators.minLength(11)]),
        ]
      }),
      cupo: this.fb.group({
        conCupo: [{ value: '', disabled: false }],
        codigoCupo: [{ value: '', disabled: true }, {
          validators: [
            Validators.required,
            Validators.minLength(this.codigoCupoRegex.length),
            Validators.maxLength(this.codigoCupoRegex.length)
          ],
          updateOn: 'blur'
        }],
        usuarioSAN: [{ value: '', disabled: true }]
      }),
      datosDocumento: this.fb.group({
        producto: [{ value: undefined, disabled: true }, [Validators.required, searchValidator()]],
        vendedor: [{ value: '', disabled: true }, [Validators.required, searchValidator()]],
        corredorComprador: [{ value: '', disabled: true }, [Validators.required, searchValidator()]],
        destinatario: [{ value: '', disabled: true }, [Validators.required, searchValidator()]],
        sedeOrigen: [{ value: '', disabled: true }, searchValidator()],
        finalidad: [{ value: '', disabled: true }, Validators.required],
        motivoCupo: [{ value: undefined, disabled: true }, Validators.required],
        titularCartaPorteSojaEPA: [{ value: undefined, disabled: true }, [Validators.required, searchValidator()]],
        campoEpa: [{ value: undefined, disabled: true }, Validators.required],
        sustentabilidad: { value: false, disabled: true },
        cosecha: [{ value: undefined, disabled: true }, Validators.required],
        procedencia: [{ value: undefined, disabled: true }],
        tarjeta: [{ value: undefined, disabled: false }],
        estadoCupo: this.fb.group({
          estadoCupoAnterior: this.fb.group({
            fechaCupo: [{ value: '', disabled: true }],
            habilitado: [{ value: '', disabled: true }],
            otorgados: [{ value: '', disabled: true }],
            ingresados: [{ value: '', disabled: true }],
            saldo: [{ value: '', disabled: true }],
          }),
          estadoCupoVigente: this.fb.group({
            fechaCupo: [{ value: '', disabled: true }],
            habilitado: [{ value: '', disabled: true }],
            otorgados: [{ value: '', disabled: true }],
            ingresados: [{ value: '', disabled: true }],
            saldo: [{ value: '', disabled: true }],
          }),
          estadoCupoSiguiente: this.fb.group({
            fechaCupo: [{ value: '', disabled: true }],
            habilitado: [{ value: '', disabled: true }],
            otorgados: [{ value: '', disabled: true }],
            ingresados: [{ value: '', disabled: true }],
            saldo: [{ value: '', disabled: true }],
          }),
          sinCupo: this.fb.group({
            habilitado: [{ value: '', disabled: true }],
            ingresados: [{ value: '', disabled: true }],
          })
        }),
        confirmacionArriboCtg: this.fb.group({
          kilosNeto: [{ value: '', disabled: true }, {
            validators: [
              Validators.min(1),
              Validators.pattern(/^-?\d+$/),
              Validators.max(2147483647)
            ]
          }],
          transportista: [{ value: undefined, disabled: true }],
          chofer: [{ value: undefined, disabled: true }, {
            validators: [
              choferInhabilitadoValidator(),
              searchValidator()
            ]
          }],
          confirmadoManualmente: [{ value: false, disabled: true } ],
          aceptarSinConfirmarCtg: [{ value: false, disabled: true }],
          ctg: [{ value: '', disabled: true }, Validators.compose([Validators.required,
          Validators.pattern('[1-9][0-9]{0,7}'),
          Validators.min(1)])],
          codigoCancelacionCtg: [{ value: '', disabled: true }, Validators.compose([Validators.required,
          Validators.min(1),
          Validators.max(9223372036854775807)])]
        })
      }),
    });
    this.fcService.initialize(this.form);
    this.autorizaciones = [];
  }

  private subscribeCambioConCupo(): void {
    const conCupoCntrl = this.fcService.getControl('cupo.conCupo');
    if (conCupoCntrl) {
      conCupoCntrl.valueChanges.pipe(
        takeUntil(this.onDestroy),
      ).subscribe((esConCupo: boolean | null) => {
        if (esConCupo != null && !this.esCargaMovimientoNavegacion) {
          this.limpiarDatosCupo();
          this.fcService.setValue(`cupo.codigoCupo`, '', { onlySelf: true });
          this.deshabilitarSeccionCampoEpa();
          if (esConCupo) {
            this.fcService.enableControl('cupo.codigoCupo');
            this.deshabilitarcontroles();
            this.cupoComponent.setFocus();
          } else {
            this.tieneCodigoCupoValido = true;
            this.habilitarControles();
            this.obtenerEstadoSinCupo();
            this.fcService.disableControl('cupo.codigoCupo');
            this.fcService.setValue(`cupo.usuarioSAN`, '', { onlySelf: true });
          }
        }
      });
    }
  }

  private limpiarDatosCupo(): void {
    this.fcService.setValue('datosDocumento.producto', undefined, { onlySelf: true });
    this.fcService.setValue('datosDocumento.vendedor', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.corredorComprador', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.destinatario', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.sedeOrigen', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.finalidad', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.motivoCupo', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.titularCartaPorteSojaEPA', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.cosecha', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.campoEpa', '', { onlySelf: true });
    this.fcService.setValue('datosDocumento.procedencia', '', { onlySelf: true });

    const estadoCupoFormGroup = this.fcService.getControl('datosDocumento.estadoCupo');
    if (estadoCupoFormGroup) {
      estadoCupoFormGroup.reset();
    }
  }

  private habilitarControles(): void {
    this.fcService.enableControl('datosDocumento.producto');
    this.fcService.enableControl('datosDocumento.vendedor');
    this.fcService.enableControl('datosDocumento.destinatario');
    this.fcService.enableControl('datosDocumento.sedeOrigen');
    this.fcService.enableControl('datosDocumento.finalidad');
    this.fcService.enableControl('datosDocumento.motivoCupo');
    this.fcService.enableControl('datosDocumento.corredorComprador');
  }

  private deshabilitarcontroles(): void {
    this.fcService.disableControl('datosDocumento.producto');
    this.fcService.disableControl('datosDocumento.vendedor');
    this.fcService.disableControl('datosDocumento.corredorComprador');
    this.fcService.disableControl('datosDocumento.destinatario');
    this.fcService.disableControl('datosDocumento.sedeOrigen');
    this.fcService.disableControl('datosDocumento.finalidad');
    this.fcService.disableControl('datosDocumento.motivoCupo');
  }

  private deshabilitarSeccionCampoEpa(): void {
    this.fcService.disableControl('datosDocumento.titularCartaPorteSojaEPA');
    this.fcService.disableControl('datosDocumento.campoEpa');
    this.fcService.disableControl('datosDocumento.cosecha');
    this.fcService.disableControl('datosDocumento.procedencia');
  }

  private subscribeCambioTipoProducto(): void {
    const tipoProducto = this.fcService.getControl('circuito.tipoProducto');
    if (tipoProducto) {
      tipoProducto.valueChanges.pipe(
        distinctUntilChanged((x, y) => (x && y) ? x.id === y.id : false),
        takeUntil(this.onDestroy)
      ).subscribe((tipoProductoSeleccionado: TipoProducto) => {
        if (tipoProductoSeleccionado) {
          this.tipoProducto = tipoProductoSeleccionado;
          this.getCircuito();
          this.esCereal = tipoProductoSeleccionado.id === TiposProducto.Cereal;
          if (!this.esCargaMovimientoNavegacion) {
            this.fcService.form.controls.cupo.reset();
            this.fcService.form.controls.datosDocumento.reset();
            this.fcService.form.controls.datosDocumento.disable();
          }
          this.documentoPorte.setFocus();
        }
      });
    }
  }

  private subscribeCambioCodigoCupo(): void {
    const codigoCupo = this.fcService.getControl('cupo.codigoCupo');
    if (codigoCupo) {
      codigoCupo.valueChanges.pipe(
        distinctUntilChanged(), takeUntil(this.onDestroy)
      ).subscribe((codigo: string) => {
        if (codigo && !this.esCargaMovimientoNavegacion) {
          this.deshabilitarcontroles();
          this.recuperarCupo();
        }
      });
    }
  }
  private subscribeCambioTipoDocumento(): void {
    const tipoDocumento = this.form.get('documentoPorte.tipoDocumentoPorte');
    if (tipoDocumento) {
      tipoDocumento.valueChanges.pipe(
        distinctUntilChanged(),
        takeUntil(this.onDestroy)
      ).subscribe((tipo: TipoDocumentoPorte) => {
        if (tipo) {
          this.tipoDocumentoPorte = tipo;
          this.ComportamientoAfip();
          const tipoDocumentoPorte = this.fcService.getControl('documentoPorte.tipoDocumentoPorte');
          if (tipoDocumentoPorte) {
            this.esCereal ? tipoDocumentoPorte.enable() : tipoDocumentoPorte.disable();
          }
          const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
          if (tipo && tipo.mascara && nroDocPorte && (!this.idMovimiento || nroDocPorte.value)) {
            this.setTipoDocumentoPorteRegex();
            nroDocPorte.clearValidators();
            nroDocPorte.setValidators([Validators.required,
            Validators.maxLength(tipo.mascara.length),
            Validators.minLength(tipo.mascara.length)]);
            this.setMascara();
          }
        }
      });
    }
  }

  private ComportamientoAfip() {
    const aceptarSinConfirmarCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const codigoCancelacionCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');
    const confirmadoManualmente = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    const titularCartaPorteCPE = this.fcService.getControl('documentoPorte.titularCartaPorteCPE');
    const numeroDocumentoPorte = this.fcService.getControl('documentoPorte.numeroDocumentoPorte');
    const titularCartaPorteSOJA = this.fcService.getControl('datosDocumento.titularCartaPorteSojaEPA');
    const ctgPapel = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.ctg');
    const ctgElectronico = this.fcService.getControl('documentoPorte.ctg');
    const transportista = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.transportista');
    const kilosNeto = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.kilosNeto');
    const chofer = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.chofer');
    const tipoDocumento = this.form.get('documentoPorte.tipoDocumentoPorte');

    if (aceptarSinConfirmarCtg &&
      ctgElectronico &&
      ctgPapel &&
      codigoCancelacionCtg &&
      titularCartaPorteCPE &&
      numeroDocumentoPorte &&
      transportista &&
      kilosNeto &&
      chofer &&
      tipoDocumento &&
      confirmadoManualmente
    ) {
      if (this.esCereal) {
        this.tipoDocumentoPorteService.consultarComportamientoAfip(this.tipoDocumentoPorte.id)
          .pipe(takeUntil(this.onDestroy))
          .subscribe((IdComportamientoAfip: number) => {
            if (IdComportamientoAfip === ComportamientoAfip.RegimenElectronico) {
              this.esCartaPorteElectronica = true;
              this.resetHabilitaDesabilitaUpdate(ctgPapel, false);
              this.manipulacionControl(aceptarSinConfirmarCtg,
                {
                  reset: !this.tieneAFIPAutomatico
                    && !this.esModificacionCupo
                    && this.movimiento
                    && !this.movimiento.sinConfirmarCtg,
                  habilita: !this.tieneAFIPAutomatico,
                });
              this.resetHabilitaDesabilitaUpdate(codigoCancelacionCtg, false);
              this.resetHabilitaDesabilitaUpdate(confirmadoManualmente, !this.tieneAFIPAutomatico, false);
              this.protegerDatosConsultaAfip(true);
              titularCartaPorteCPE.setValidators([Validators.required, searchValidator()]);
              titularCartaPorteCPE.updateValueAndValidity();
              transportista.clearValidators();
              transportista.updateValueAndValidity();
              chofer.clearValidators();
              chofer.updateValueAndValidity();
              kilosNeto.clearValidators();
              kilosNeto.updateValueAndValidity();
              this.comportamientoControlesTitular();
              if (this.movimiento) {
                if (this.confirmoCtg || this.consultoAfip) {
                  this.manipulacionControl(ctgElectronico, { habilita: false });
                  this.manipulacionControl(titularCartaPorteCPE, { habilita: false });
                  this.manipulacionControl(numeroDocumentoPorte, { habilita: false });
                }
              }
              if (this.esConsulta) {
                this.deshabilitarPorConsulta(
                  [aceptarSinConfirmarCtg,
                    confirmadoManualmente,
                    titularCartaPorteCPE,
                    numeroDocumentoPorte,
                    ctgElectronico,
                    ctgPapel,
                    tipoDocumento]);
              }
              this.evaluarConfirmacion();
            } else {
              this.protegerDatosConsultaAfip(false);
              this.esCartaPorteElectronica = false;
              this.resetHabilitaDesabilitaUpdate(ctgPapel, true, false);
              titularCartaPorteCPE.clearValidators();
              titularCartaPorteCPE.updateValueAndValidity();
              transportista.setValidators([Validators.required]);
              transportista.updateValueAndValidity();
              kilosNeto.setValidators([Validators.required]);
              kilosNeto.updateValueAndValidity();
              chofer.setValidators([Validators.required]);
              chofer.updateValueAndValidity();
              this.comportamientoControlesTitular();
              this.resetHabilitaDesabilitaUpdate(confirmadoManualmente, false);
              this.resetHabilitaDesabilitaUpdate(codigoCancelacionCtg, !this.tieneAFIPAutomatico);
              this.manipulacionControl(aceptarSinConfirmarCtg,
                {
                  habilita: !this.tieneAFIPAutomatico,
                });
              if (this.esConsulta) {
                this.deshabilitarPorConsulta(
                  [aceptarSinConfirmarCtg,
                    confirmadoManualmente,
                    titularCartaPorteCPE,
                    numeroDocumentoPorte,
                    ctgElectronico,
                    ctgPapel,
                    tipoDocumento,
                    codigoCancelacionCtg]);
              }
            }
          });
        if (titularCartaPorteSOJA) { titularCartaPorteSOJA.reset(); titularCartaPorteSOJA.updateValueAndValidity(); }
      } else {
        this.esCartaPorteElectronica = false;
        titularCartaPorteCPE.clearValidators();
        titularCartaPorteCPE.updateValueAndValidity();
        transportista.setValidators([Validators.required]);
        kilosNeto.setValidators([Validators.required]);
        chofer.setValidators([Validators.required]);
        transportista.updateValueAndValidity();
        kilosNeto.updateValueAndValidity();
        chofer.updateValueAndValidity();
        this.comportamientoControlesTitular();
        if (this.esConsulta) {
          this.deshabilitarPorConsulta(
            [aceptarSinConfirmarCtg,
              confirmadoManualmente,
              titularCartaPorteCPE,
              numeroDocumentoPorte,
              ctgElectronico,
              ctgPapel,
              tipoDocumento]);
        } else {
          this.resetHabilitaDesabilitaUpdate(ctgElectronico, false);
          this.resetHabilitaDesabilitaUpdate(ctgPapel, false);
          this.resetHabilitaDesabilitaUpdate(numeroDocumentoPorte, true, !this.esModificacionFueraPuesto && !this.esModificacionCupo);
        }
      }
    }
  }

  private resetHabilitaDesabilitaUpdate(control: AbstractControl, habilita: boolean, reset = true) {
    if (control) {
      if (reset) { control.reset(); }
      control.updateValueAndValidity();
      habilita ? control.enable() : control.disable();
    }
  }

  private setTipoDocumentoPorteRegex(): void {
    this.tipoDocPorteRegex = [];
    for (const char of this.tipoDocumentoPorte.mascara) {
      if (char === '-') {
        this.tipoDocPorteRegex.push('-');
      } else {
        this.tipoDocPorteRegex.push(/[0-9 ]+/);
      }
    }
  }

  protected setMascara(): void {
    const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    if (nroDocPorte && nroDocPorte.value && this.tipoDocPorteRegex) {
      const numeroSinMascara = nroDocPorte.value.replace(/[-]/, '');
      const numeroDoc = conformToMask(
        numeroSinMascara,
        this.tipoDocPorteRegex,
        { guide: false }
      );
      this.fcService.setValue(`documentoPorte.numeroDocumentoPorte`, numeroDoc.conformedValue, { onlySelf: true });
    }
  }

  private getCircuito(): void {
    this.circuitoService.getCircuito(TiposMovimiento.Descarga, this.tipoTransporte.id,
      this.tipoProducto.id, [this.idActividad])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
        this.tieneCaracteristicaDeCTG = this.circuito.debeActivarCaracteristica([Caracteristicas.ConfirmaCtgControlDescargaCereales]);
        this.habilitarControlesCupo();
        if (this.esNavegacion) {
          this.buscarMovimiento();
        }
        if (this.movimiento == null || !(this.movimiento.consultoAfip || this.movimiento.confirmoCtg)) {
          this.habilitarCtg();
        }
      });
  }

  private habilitarCtg(): void {
    this.datosDocumento.habilitarCTG(this.tieneCaracteristicaDeCTG);
  }

  private habilitarControlesCupo() {
    this.ingresoConCupo = this.circuito.debeActivarCaracteristica([Caracteristicas.IngresoConCupo]);
    this.ingresoSinCupo = this.circuito.debeActivarCaracteristica([Caracteristicas.IngresoSinCupo]);
    if (!this.ingresoConCupo && !this.ingresoSinCupo) {
      this.popupService.error(Resources.Messages.ReviseLaParametrizacionDelCircuito, Resources.Labels.Error);
    }
  }

  recuperarCupo(): void {
    const codigoCupoCtrl = this.fcService.getControl('cupo.codigoCupo');
    if (codigoCupoCtrl && codigoCupoCtrl.value && codigoCupoCtrl.valid) {
      this.isLoading = true;
      this.cupoService.getCupoPorCodigo(codigoCupoCtrl.value, null, this.tipoProducto)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((cupoDataView: CodigoCupo) => {
          this.isLoading = false;
          if (cupoDataView && !this.esCargaMovimientoNavegacion) {
            this.cupo = new CodigoCupo();
            Object.assign(this.cupo, cupoDataView);
            this.obtenerEstadoCupo();
            this.verificarEstadoInicialCupo();
            this.tieneCodigoCupoValido = true;
            this.fcService.setValue(`cupo.usuarioSAN`, cupoDataView.usuarioSAN, { onlySelf: true }, true);
          }
        }, (error: HttpErrorResponse) => {
          this.isLoading = false;
          this.tieneCodigoCupoValido = false;
          this.fcService.setValue(`cupo.usuarioSAN`, '');
          this.limpiarDatosCupo();
          this.deshabilitarcontroles();
          this.deshabilitarSeccionCampoEpa();
          if (error.status === HttpStatus.NOT_FOUND) {
            this.popupService.error(Resources.Messages.ElCupoIngresadoNoExiste, Resources.Labels.Error);
            codigoCupoCtrl.setErrors({ CupoIngresadoNoExiste: true });
          } else {
            codigoCupoCtrl.setErrors({ CupoInvalido: true });
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

  private obtenerEstadoCupo(): void {
    if (!this.cupo || this.cupo && this.cupo.esEstadoInicialSinCupo()) {
      this.obtenerEstadoSinCupo();
    } else if (this.cupo && this.cupo.esEstadoPendienteCupo()) {
      this.obtenerEstadoParaPendienteCupo();
    } else {
      this.obtenerEstadoConCupo(this.cupo.id, this.cupo.estadoInicial.id);
    }
  }

  private obtenerEstadoConCupo(idCodigoCupo: number, idEstadoInicial: number): void {
    this.cupoService.getEstadoConCupo(idCodigoCupo, idEstadoInicial)
      .subscribe((estadoConCupo: EstadoVigenciaCupoDataView) => {
        if (estadoConCupo) {
          this.estadoCupoDataView = estadoConCupo;
        }
      });
  }

  obtenerEstadoSinCupo(): void {
    this.cupoService.getEstadoSinCupo().subscribe((estadoSinCupo: EstadoVigenciaCupoDataView) => {
      if (estadoSinCupo) {
        this.estadoCupoDataView = estadoSinCupo;
      }
    });
  }

  private obtenerEstadoParaPendienteCupo(): void {
    if (this.cupo) {
      this.cupoService.getEstadoInicial(this.cupo.id).subscribe((estadoCupo: EstadoCupo) => {
        if (estadoCupo && this.cupo) {
          this.cupo.setearEstadoInicial(estadoCupo);
          this.obtenerEstadoConCupo(this.cupo.id, this.cupo.estadoInicial.id);
        }
      });
    }
  }

  private buscarTurnoCircular(command: CrearPreingresoCommand): void {
    this.turnoCircularService.BuscarTurnoCircular(this.armaBuscarTurnoCircularQuery(command))
      .subscribe(turno => {
        if (turno) {
          command.idTurnoCircular = turno.id;
          command.turnoCircularVigente = turno.vigente;
          if (!turno.tieneMovimientoAsociado) {
            if (!turno.vigente) {
              this.popupService.warning(
                Resources.Messages.MovimientoCuentaConTurnoCircularVencido.format(turno.fechaDesdeTolerancia, turno.fechaHastaTolerancia)
              );
            } else {
              this.popupService.success(Resources.Messages.MovimientoCuentaConTurnoCircular);
            }
          }
        }
        if (this.esAceptar) {
          this.crearPreIngreso(command);
        } else {
          this.accionDejarPendiente(command);
        }
      });
  }

  aceptar(): void {
    this.esAceptar = true;
    if (this.fcService.isValidForm()) {
      if (this.debeSeleccionarUnCheck()) {
        this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnCheck);
        return;
      }
      this.isLoading = true;
      if (this.idActividad !== Actividades.ModificarValidacionCupoFueraPuesto) {
        const command = this.mapControlsToCommand();
        if (this.debeConsumirWSAfipCPE()) {
          this.popupService.info(Resources.Messages.ConectandoConElServicioAfip);
        }
        if (this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.InformarCircularArriboCamion], this.idActividad)) {
          this.buscarTurnoCircular(command);
        } else {
          this.crearPreIngreso(command);
        }
      } else {
        const command = this.mapControlsToModificarFueraPuestoCommand();
        this.validarCupoService.modificarFueraPuesto(command, this.tipoProducto.id).pipe(
          takeUntil(this.onDestroy),
          catchError((caught: Observable<void>) => {
            this.isLoading = false;
            return caught;
          })
        )
          .subscribe(() => {
            this.successfulResult();
          });
      }
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

  private crearPreIngreso(command: CrearPreingresoCommand) {
    this.validarCupoService.create(command, this.tipoProducto.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => {
        this.successfulResult();
      }, (error: HttpErrorResponse) => {
        this.isLoading = false;
        if (error.error && error.error.data && error.error.data.validationData) {
          const numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
          if (numeroTarjeta && error.error.data.validationData[numeroTarjeta]) {
            this.fcService.setValue(`datosDocumento.tarjeta`, '', { onlySelf: true });
          } else {
            this.mapearRoles(error.error.data.validationData);
            this.modalAutorizacion.autorizarRoles(this.rolesAAutorizar.slice());
          }
        }
        if (error.status === HttpStatus.BAD_GATEWAY) {
          this.popupService.warning(Resources.Messages.ElServicioAfipNoSeEncuentraDisponible, Resources.Labels.ErrorAfip);
          this.activarAceptarSinConfirmarCtg();
        }
      });
  }

  private mapearRoles(roles: any[]) {
    const rolesPrimerOrden: EntityWithDescription[] = [];
    const rolesSegundoOrden: EntityWithDescription[] = [];

    for (const key in roles) {
      if (roles.hasOwnProperty(key)) {
        if (roles[key].orden === 1) {
          rolesPrimerOrden.push(new EntityWithDescription(+key, roles[key].nombre));
        } else {
          rolesSegundoOrden.push(new EntityWithDescription(+key, roles[key].nombre));
        }
      }
    }

    this.rolesAAutorizar = [];
    if (rolesSegundoOrden.length) {
      this.rolesAAutorizar.push(rolesSegundoOrden);
    }
    if (rolesPrimerOrden.length) {
      this.rolesAAutorizar.push(rolesPrimerOrden);
    }
  }

  onAutorizacionCompletada(autorizaciones: Autorizacion[]) {
    this.autorizaciones = this.autorizaciones.concat(autorizaciones);
    if (this.autorizaciones && this.rolesAAutorizar.every(r => this.autorizaciones.some(a => r.some(rol => rol.id === a.idRol)))) {
      this.aceptar();
    }
  }

  protected successfulResult(): void {
    this.falloAfip = false;
    this.isLoading = false;
    this.popupService.success(Resources.Messages.SeAceptoElIngresoDeLaDescarga, Resources.Labels.Notificacion);
    if (this.esNavegacion) {
      setTimeout(() => { this.navigationService.navigateBack(); }, 1500);
    } else {
      this.resetForm();
    }
  }

  private activarAceptarSinConfirmarCtg(): void {
    this.falloAfip = true;
    if (this.esCartaPorteElectronica) {
      this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    } else {
      this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');
    }
    this.fcService.enableControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
  }

  abrirModalTarjeta(): void {
    if (this.circuito.poseeActividad(Actividades.ModificarValidacionCupo) &&
      this.debeConsumirWSAfipCPE() && this.esCartaPorteElectronica) {
      this.validacionConsistenciaDatos();
    } else if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) &&
      !this.fcService.getValue('datosDocumento.tarjeta')) {
      this.modalAsignarTarjeta.abrir();
    } else {
      this.aceptar();
    }
  }

  onTarjetaAsignada(): void {
    this.fcService.setValue('datosDocumento.tarjeta',
      this.modalAsignarTarjeta.asignarTarjetaForm.controls.numeroTarjeta.value, { onlySelf: true });
    this.aceptar();
  }

  private mapControlsToCommand(): CrearPreingresoCommand {
    const command = new CrearPreingresoCommand();
    command.autorizaciones = this.autorizaciones;
    command.idCircuito = this.circuito.id;
    command.idActividad = this.idActividad;
    command.idTipoDocumentoPorte = Number(this.fcService.getValue('documentoPorte.tipoDocumentoPorte'));
    command.numeroDocumentoPorte = this.fcService.getValue('documentoPorte.numeroDocumentoPorte');
    command.idProducto = Number(this.fcService.getValue('datosDocumento.producto'));
    command.idVendedor = Number(this.fcService.getValue('datosDocumento.vendedor'));
    command.idCorredorComprador = Number(this.fcService.getValue('datosDocumento.corredorComprador'));
    command.idDestinatario = Number(this.fcService.getValue('datosDocumento.destinatario'));
    command.idSedeOrigen = Number(this.fcService.getValue('datosDocumento.sedeOrigen'));
    command.idMotivoCupo = Number(this.fcService.getValue('datosDocumento.motivoCupo'));
    command.idFinalidad = Number(this.fcService.getValue('datosDocumento.finalidad'));
    command.idTitular = Number(this.esCartaPorteElectronica ? this.fcService.getValue('documentoPorte.titularCartaPorteCPE') :
      this.fcService.getValue('datosDocumento.titularCartaPorteSojaEPA'));
    command.idCosecha = Number(this.fcService.getValue('datosDocumento.cosecha'));
    command.idProcedencia = Number(this.fcService.getValue('datosDocumento.procedencia'));
    command.idTipoProducto = Number(this.fcService.getValue('circuito.tipoProducto'));

    const transportistaCtrl = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.transportista');
    if (transportistaCtrl && transportistaCtrl.value) {
      command.idTransportista = Number(transportistaCtrl.value.id);
      command.codigoFiscalTransportista = transportistaCtrl.value.codigo;
    }

    const esSojaEPA: boolean = (command.idProducto === Productos.SojaEPA);
    const idCampoCarta = Number(this.fcService.getValue('datosDocumento.campoEpa'));
    if (esSojaEPA) {
      command.idCampoEpa = idCampoCarta;
    } else {
      command.idCartaSustentable = idCampoCarta;
    }

    command.idChofer = Number(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.chofer'));
    command.codigoCancelacionCtg = this.fcService.getValue('datosDocumento.confirmacionArriboCtg.codigoCancelacionCtg');
    command.aceptarSinConfirmarCtg = this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    command.confirmadoManualmente = this.fcService.getValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    command.codigoTrazabilidadGrano = this.esCartaPorteElectronica ? this.fcService.getValue('documentoPorte.ctg') :
      this.fcService.getValue('datosDocumento.confirmacionArriboCtg.ctg');
    command.kilosNeto = Number(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.kilosNeto'));
    command.codigoCupo = this.fcService.getValue('cupo.codigoCupo');
    command.esModificacion = !this.esAltaValidacionCupo && !this.esConsulta;

    if (!this.esConsulta) {
      command.numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    }

    if (this.cupo && this.cupo.estadoInicial) {
      command.idEstadoInicialCupo = this.cupo.estadoInicial.id;
    }

    if (this.movimiento) {
      command.id = this.movimiento.id;
    }
    return command;
  }

  armaBuscarTurnoCircularQuery(crearPreingresoCommand: CrearPreingresoCommand): BuscarTurnoCircularQuery {
    const query = new BuscarTurnoCircularQuery;
    query.CTG = crearPreingresoCommand.codigoTrazabilidadGrano;
    query.productoId = crearPreingresoCommand.idProducto;
    query.idTipoDocumentoPorte = crearPreingresoCommand.idTipoDocumentoPorte;

    return query;
  }

  private mapControlsToModificarFueraPuestoCommand(): ModificarValidacionCupoFueraPuestoCommand {
    return this.mapControlsToCommand() as ModificarValidacionCupoFueraPuestoCommand;
  }

  protected resetForm(): void {
    this.fcService.resetForm({ emitEvent: true });
    this.createForm();
    this.subscribeControlChanges();
    this.documentoPorte.setFocus();
    this.estadoCupoDataView = null;
    this.tieneCodigoCupoValido = true;
    this.falloAfip = false;
    this.limpiarCupo();
  }

  private limpiarCupo(): void {
    this.cupo = null;
  }

  cancelar(): void {
    if (!this.esConsulta && !this.esAltaValidacionCupo) {
      this.navigationService.navigate(this.validarCupoPath, this.gestionarCupoPath);
    } else {
      this.popupService.confirmOk(() => {
        this.popupService.warning(Resources.Messages.SeCanceloElIngresoDeLaDescarga, Resources.Labels.Cancelar);
        if (this.esNavegacion) {
          setTimeout(() => this.navigationService.navigateBack(), 1000);
        } else {
          this.resetForm();
        }
      }, Resources.Messages.DeseaConfirmarEstaAccion, Resources.Labels.Confirmar);
    }
  }

  openModalMotivo(): void {
    if (this.verificarPuedeDejarPendiente()) {
      const selectedValue = new MotivoEstadoMovimiento(MotivosEstadoMovimiento.Datos, Resources.Labels.Datos);
      this.modalMotivo.open(selectedValue, false);
    } else {
      this.documentoPorte.setFocus();
    }
  }

  openConsultarDatosAfip(): void {
    const ctgCtrl = this.esCartaPorteElectronica ? this.fcService.getControl('documentoPorte.ctg') : this.fcService.getControl('datosDocumento.confirmacionArriboCtg.ctg');
    if (ctgCtrl && ctgCtrl.value) {
      this.showCTGData = true;
      this.consultarDatosAfip.abrir(ctgCtrl.value);
    } else {
      this.popupService.error(Resources.Messages.DebeIngresarUnNroDeCTGAConsultar);
    }
  }

  closeConsultarDatosAfip(): void {
    this.showCTGData = false;
  }

  dejarPendiente(): void {
    this.esAceptar = false;
    this.isLoading = true;
    const command = this.mapControlsToCommand();
    const motivoEstado = this.modalMotivo.getMotivoEstadoMovimientoSeleccionado();
    command.observacionDelMotivo = this.modalMotivo.getObservacion();
    command.idMotivoEstadoMovimiento = motivoEstado.id;
    command.esDejarPendiente = true;
    if (this.circuito.debeActivarCaracteristicaPorActividad([Caracteristicas.InformarCircularArriboCamion], this.idActividad)) {
      this.buscarTurnoCircular(command);
    } else {
      this.accionDejarPendiente(command);
    }
  }

  private accionDejarPendiente(command: CrearPreingresoCommand): void {
    this.validarCupoService.DejarPendiente(command, this.tipoProducto.id)
      .pipe(
        takeUntil(this.onDestroy),
        catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        })
      )
      .subscribe(() => {
        this.isLoading = false;
        this.popupService.info(Resources.Messages.LaDescargaQuedoEnEstadoPendiente, Resources.Labels.Notificacion);
        if (this.esNavegacion && !this.esConsulta) {
          setTimeout(() =>
            this.navigationService.navigateBack(),
            1000);
        } else {
          this.resetForm();
        }
      });
  }

  private verificarPuedeDejarPendiente(): boolean {
    const tipoDocPorte = this.form.get('documentoPorte.tipoDocumentoPorte');
    const nroDocPorte = this.form.get('documentoPorte.numeroDocumentoPorte');
    const codigoCupoCtrl = this.form.get('cupo.codigoCupo');
    const ctgElectronico = this.form.get('documentoPorte.ctg');

    if (tipoDocPorte && tipoDocPorte.invalid) {
      this.popupService.error(Resources.Messages.ElTipoDocumentoPorteEsObligatorioDejarPendiente,
        Resources.Labels.Notificacion);
      return false;
    }
    if (nroDocPorte && nroDocPorte.invalid) {
      this.popupService.error(Resources.Messages.ElNumeroDocumentoPorteEsObligatorioDejarPendiente,
        Resources.Labels.Notificacion);
      return false;
    }
    if (codigoCupoCtrl && codigoCupoCtrl.invalid) {
      this.popupService.error(Resources.Messages.ElCupoEsObligatorioCuandoEsMovimientoConCupoDejarPendiente,
        Resources.Labels.Notificacion);
      return false;
    }
    if (ctgElectronico && ctgElectronico.invalid && this.esCartaPorteElectronica) {
      this.popupService.error(Resources.Messages.ElCTGEsObligatorioCuandoEsMovimientoConCupoDejarPendiente,
        Resources.Labels.Notificacion);
      return false;
    }


    return true;
  }

  openConfirmacionAnulacion() {
    if (this.estadosValidosParaAnular.some(e => e === this.movimiento.estado.id)) {
      this.modalConfirmacionAnulacion.open();
    } else {
      this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion,
        Resources.Labels.AnularValidacionCupo);
    }
  }

  anular(observaciones?: string) {
    this.isLoading = true;
    const command = new AnularCupoCommand();
    command.id = this.movimiento.id;
    command.observaciones = String(observaciones);
    this.anularCuposService.registrarAnulacion(command)
      .pipe(
        takeUntil(this.onDestroy),
        catchError((caught: Observable<void>) => {
          this.isLoading = false;
          return caught;
        })
      )
      .subscribe(() => {
        this.isLoading = false;
        this.popupService.success(Resources.Messages.LaAnulacionDelCupoSeRealizoConExito, Resources.Labels.AnularValidacionCupo);
        setTimeout(() => { this.navigationService.navigateBack(); }, 1500);
      });
  }

  private completarestadosValidosParaModificar(actividad: number): number[] {
    const estadosValidos = new Array<number>();
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(tiposMovimientos[1].id,
      [actividad])
      .subscribe(estados => {
        estados.forEach(estado => estadosValidos.push(estado.id));
      });
    return estadosValidos;
  }

  onAFIPAutomatico(esAutomatico: boolean): void {
    this.tieneAFIPAutomatico = esAutomatico;
  }

  private comportamientoControlesTitular() {
    const productoCtrl = this.fcService.getControl('datosDocumento.producto');
    if (!this.esCartaPorteElectronica &&
      productoCtrl !== null &&
      productoCtrl.value &&
      productoCtrl.value.id === Productos.SojaEPA &&
      !this.esConsulta) {
      this.fcService.enableControl('datosDocumento.titularCartaPorteSojaEPA');
    } else {
      this.fcService.disableControl('datosDocumento.titularCartaPorteSojaEPA');
    }
  }

  onRecuperarDatoCpe() {
    const ctg = this.fcService.getControl('documentoPorte.ctg');
    if (ctg && ctg.valid
      && this.esCartaPorteElectronica
      && this.tieneAFIPAutomatico) {
      this.servicioAfip.getDataCpe(ctg.value, this.tipoDocumentoPorte.id).subscribe(datosCPE => {
        this.fcService.disableControl('documentoPorte.ctg');
        this.fcService.setValue('documentoPorte.numeroDocumentoPorte', datosCPE.cartaPorte);
        this.fcService.setValue('documentoPorte.titularCartaPorteCPE', datosCPE.titular, { onlySelf: true });
      }, error => {
        if (error.status === HttpStatus.BAD_GATEWAY) {
          this.popupService.warning(Resources.Messages.ElServicioAfipNoSeEncuentraDisponible, Resources.Labels.ErrorAfip);
          this.activarAceptarSinConfirmarCtg();
        }
      }
      );
    }
  }

  validacionConsistenciaDatos() {
    const numeroTarjeta = this.fcService.getValue('datosDocumento.tarjeta');
    const ctg = this.fcService.getControl('documentoPorte.ctg');
    const idMovimiento = this.movimiento.id;
    if (ctg
      && this.esCartaPorteElectronica
      && this.circuito.poseeActividad(Actividades.ModificarValidacionCupo)) {
      this.servicioAfip.getDataCpe(ctg.value, this.tipoDocumentoPorte.id, idMovimiento).subscribe(datosCPE => {
        if (this.movimiento.nroDocumentoPorte !== datosCPE.cartaPorte.replace('-', '') && this.movimiento.titular !== datosCPE.titular) {
          this.popupService.confirmOk(() => {

            this.fcService.disableControl('documentoPorte.ctg');
            this.fcService.setValue('documentoPorte.numeroDocumentoPorte', datosCPE.cartaPorte);
            this.fcService.setValue('documentoPorte.titularCartaPorteCPE', datosCPE.titular, { onlySelf: true });

            if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) &&
              !numeroTarjeta) {
              this.modalAsignarTarjeta.abrir();
            } else {
              this.aceptar();
            }

          }, Resources.Messages.InconsistenciaDeDatos,
            'Datos inconsistentes');
        } else {
          if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) &&
            !numeroTarjeta) {
            this.modalAsignarTarjeta.abrir();
          } else {
            this.aceptar();
          }
        }
      },
        error => {
          if (error.status === HttpStatus.BAD_GATEWAY) {
            if (this.circuito.debeActivarCaracteristica([Caracteristicas.AsignarTarjetaControlDescarga]) &&
              !numeroTarjeta) {
              this.modalAsignarTarjeta.abrir();
            } else {
              this.aceptar();
            }
          }
        }
      );
    }
  }

  private debeSeleccionarUnCheck() {
    return !(this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg') ||
      this.fcService.getValue('datosDocumento.confirmacionArriboCtg.confirmadoManualmente'))
      && this.esCartaPorteElectronica
      && (this.falloAfip || !this.tieneAFIPAutomatico);
  }

  private debeConsumirWSAfipCPE() {
    return this.tipoProducto.id === TiposProducto.Cereal
      && !this.fcService.getValue('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg')
      && this.tieneCaracteristicaDeCTG
      && this.tieneAFIPAutomatico;
  }

  // TODO Migrar implementacion al metodo "manipulacionControl"
  protegerDatosConsultaAfip(esElectronica: boolean) {
    const ctgElectronico = this.fcService.getControl('documentoPorte.ctg');
    const titularCartaPorteCPE = this.fcService.getControl('documentoPorte.titularCartaPorteCPE');
    const numeroDocumentoPorte = this.fcService.getControl('documentoPorte.numeroDocumentoPorte');
    const tipoDocumentoPorte = this.fcService.getControl('documentoPorte.tipoDocumentoPorte');

    const consultoAfip = this.movimiento != null && this.movimiento.consultoAfip;

    if (titularCartaPorteCPE &&
      numeroDocumentoPorte &&
      ctgElectronico &&
      tipoDocumentoPorte) {

      if (esElectronica) {
        this.resetHabilitaDesabilitaUpdate(titularCartaPorteCPE, !(this.tieneAFIPAutomatico || consultoAfip)
          , false);
        this.resetHabilitaDesabilitaUpdate(numeroDocumentoPorte, !(this.tieneAFIPAutomatico || consultoAfip)
          , false);
        this.resetHabilitaDesabilitaUpdate(ctgElectronico, !(this.esModificacionCupo && this.tieneAFIPAutomatico) ||
          ((!consultoAfip || this.movimiento == null) && this.esModificacionFueraPuesto)
          , false);
        this.resetHabilitaDesabilitaUpdate(tipoDocumentoPorte, !(this.esModificacionCupo && this.movimiento.confirmoCtg)
          , false);
      } else {
        this.resetHabilitaDesabilitaUpdate(titularCartaPorteCPE, false, true);
        this.resetHabilitaDesabilitaUpdate(ctgElectronico, false);
        this.resetHabilitaDesabilitaUpdate(numeroDocumentoPorte, true, false);
      }
    }
  }

  deshabilitarPorConsulta(controles: AbstractControl[]) {
    controles.forEach(control => {
      this.resetHabilitaDesabilitaUpdate(control, false, false);
    });
  }

  manipulacionControl(control: AbstractControl, parametros: {
    validaciones?,
    habilita?,
    valor?,
    reset?,
    clearValidaciones?
  }) {
    if (control) {
      if (parametros.clearValidaciones !== undefined && parametros.clearValidaciones === true) { control.clearValidators(); }
      if (parametros.validaciones !== undefined) { control.setValidators(parametros.validaciones); }
      if (parametros.habilita !== undefined) { parametros.habilita ? control.enable() : control.disable(); }
      if (parametros.valor !== undefined) { control.setValue(parametros.valor); }
      if (parametros.reset !== undefined && parametros.reset === true) { control.reset(); }
      control.updateValueAndValidity();
    }
  }

  evaluarConfirmacion() {
    const ctgElectronico = this.fcService.getControl('documentoPorte.ctg');
    const numeroDocumentoPorte = this.fcService.getControl('documentoPorte.numeroDocumentoPorte');
    const titularCartaPorteCPE = this.fcService.getControl('documentoPorte.titularCartaPorteCPE');
    const confirmadoManualmente = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.confirmadoManualmente');
    const aceptarSinConfirmarCtg = this.fcService.getControl('datosDocumento.confirmacionArriboCtg.aceptarSinConfirmarCtg');
    const tipoDocumento = this.form.get('documentoPorte.tipoDocumentoPorte');

    if (ctgElectronico &&
      numeroDocumentoPorte &&
      titularCartaPorteCPE &&
      confirmadoManualmente &&
      aceptarSinConfirmarCtg &&
      tipoDocumento) {
      if (this.movimiento) {
        if (this.movimiento.confirmoCtg || this.movimiento.confirmadoManualmente) {
          this.deshabilitarPorConsulta(
            [ctgElectronico,
              numeroDocumentoPorte,
              titularCartaPorteCPE,
              confirmadoManualmente,
              aceptarSinConfirmarCtg,
              tipoDocumento]);
        }
      }
    }
  }
}
