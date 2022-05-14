import { FormBuilder, FormGroup, FormArray, Validators, AbstractControl } from '@angular/forms';
import { ViewChild, OnInit, OnDestroy } from '@angular/core';
import { NavigationExtras } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Subject, Observable, Subscription } from 'rxjs';
import { takeUntil, map, distinctUntilChanged } from 'rxjs/operators';
import * as HttpStatus from 'http-status-codes';

import { PopupService } from '../../../core/services/popupService/popup.service';
import { IngresarCalidadCaladoService } from '../../ingresar-calidad-calado/ingresar-calidad-calado.service';
import { CircuitoService } from '../services/circuito.service';
import { RubrosCalidadService } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ConfirmacionProductoCalado } from '../../ingresar-calidad-calado/confirmaciones/confirmacionProductoCalado.service';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { DropdownNotificationService } from '../../../core/shared/super/dropdown-notification.service';
import { Terminal } from '../../../shared/data-models/terminal';
import { FiltroMovimientoComponent } from '../../ingresar-calidad-calado/filtro-movimiento/filtro-movimiento.component';
import { RubrosCalidadComponent } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.component';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { DatosLaboratorioComponent } from '../datos-laboratorio/datos-laboratorio.component';
import { IngresarCalidadCamaraComponent } from '../../ingresar-calidad-calado/ingresar-calidad-camara/ingresar-calidad-camara.component';
import { ConsultarCalidadComponent } from '../consultar-calidad/consultar-calidad.component';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Producto } from '../../../shared/data-models/producto';
import { GrupoRubroCalidadAnalisis } from '../../../shared/data-models/grupo-rubro-calidad-analisis';
import { AuthService } from '../../../core/services/session/auth.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { tiposMovimientos } from '../../../shared/data-models/tipo-movimiento';
import { tiposTransportes } from '../../../shared/data-models/tipo-transporte';
import { TiposProducto, AccionesCalidad, Operaciones, Caracteristicas, TiposTransporte, EstadosMovimiento, TiposMovimiento, DecisionesLaboratorio } from '../../../shared/enums/enums';
import { IngresoCalidad, AccionCalado } from '../../../shared/data-models/ingreso-calidad/ingreso-calidad';
import { RubroCalidadMovimientoCereal } from '../../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';
import { requiredIf } from '../validators/requiredIf.validator';
import { IngresarCalidadCommand } from '../../../shared/data-models/commands/cargas-descargas/ingresar-calidad-command';
import { Collection } from '../../../core/models/collection';
import { referenciaDestinoRequeridoSegunActividadValidator } from '../validators/dropdowns.validator';
import { requeridoSiCheckCamaraTildado } from '../../ingresar-calidad-calado/ingresar-calidad-calado.validator';
import { CaladoService } from '../../ingresar-calidad-calado/calado.service';
import { minIf } from '../validators/minIf.validator';
import { maxIf } from '../validators/maxIf.validator';
import { AccionPosCalado } from '../../../shared/data-models/calculo-calidad/accion-pos-calado';
import { CalculoCalidad } from '../../../shared/data-models/calculo-calidad/calculo-calidad';
import { MedicionDeRubro } from '../../../shared/data-models/calculo-calidad/medicion-rubro';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../validators/fecha.validator';
import { CommandService, Command } from '../../../shared/command-service/command.service';
import { MovimientoService } from '../services/movimiento.service';
import { CondicionMermaEspecialDataView } from '../../../shared/data-models/ingreso-calidad/condicion-merma-especial-data-view';
import { MermasEspecialesComponent } from '../../ingresar-calidad-calado/mermas-especiales/mermas-especiales.component';
import { CondicionMermaEspecialCommand } from '../../../shared/data-models/ingreso-calidad/condicion-merma-especial-command';
import { ModalConfirmarImpresionComponent } from '../modals/modal-confirmar-impresion/modal-confirmar-impresion.component';

export abstract class IngresarCalidadBaseComponent implements OnInit, OnDestroy {

  @ViewChild('filtroMovimiento') filtroMovimiento: FiltroMovimientoComponent;
  @ViewChild('rubrosCalidadComponent') rubrosCalidadComponent: RubrosCalidadComponent;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('datosLaboratorioComponent') datosLaboratorioComponent: DatosLaboratorioComponent;
  @ViewChild('datosCamaraComponent') datosCamaraComponent: IngresarCalidadCamaraComponent;
  @ViewChild('consultarCalidad') consultarCalidad: ConsultarCalidadComponent;
  @ViewChild('mermasEspecialesComponent') mermasEspecialesComponent: MermasEspecialesComponent;
  @ViewChild('modalConfirmarImpresionObleaLaboratorio') modalConfirmarImpresionObleaLaboratorioComponent: ModalConfirmarImpresionComponent;
  ingresarCalidadCaladoForm: FormGroup;
  circuito: Circuito;
  movimiento: MovimientoCalado;
  tipoProductoSeleccionada: TipoProducto;
  esFueraCircuito: boolean;
  mostrarAceptar = false;
  deshabilitarCalculoCalidad: boolean;
  completarTipoProducto = false;
  disableButtons: boolean;
  rubrosSelected: any[] = [];
  rubrosPorTipoAnalisis: any[] = [];
  disableSelectRubro = true;
  producto: Producto;
  caracteristicaCamaraHabilitada: boolean;
  protected onDestroy = new Subject();
  protected basePath;
  esNavegacion: boolean;
  terminal: Terminal;
  showCalidadAnterior = false;
  operacion: Operaciones;
  accionesHabilitadas: any[];
  formReady = new Subject();
  lecturaAutomatica: boolean;
  esVagon = false;
  subscription: Subscription;
  esModificacion: boolean;
  esContinuar = false;
  esCarga = false;
  habilitaGrillaMermasEspeciales = false;
  nroDocumentoPorte = '';
  ctg = 0;
  esAcopio = false;
  readonly deseaImprimirLaObleaLaboratorioEnEsteMomento = Resources.Messages.DeseaImprimirLaObleaLaboratorioEnEsteMomento;
  private modalImprimeObleaLaboratorioAbierto = false;
  protected destroyedByNavigation = false;

  get rubrosCalidad(): FormArray {
    return this.ingresarCalidadCaladoForm.get('rubros.rubrosCalidad') as FormArray;
  }

  get mermasEspeciales(): FormArray {
    return this.ingresarCalidadCaladoForm.get('mermasEspeciales') as FormArray;
  }

  get esAccionPendienteSupervisor(): boolean {
    const accion = this.ingresarCalidadCaladoForm.get('accion.accion');
    if (accion) {
      return accion.value === AccionesCalidad.PendienteSupervisor;
    }
    return false;
  }

  get imprimeObleaLaboratorio(): boolean {
    return this.terminal.usaMuestraTipoAcopio &&
      this.movimiento.imprimeObleaLaboratorio;
  }

  constructor(
    protected readonly popupService: PopupService,
    private readonly fb: FormBuilder,
    private readonly calidadCaladoService: IngresarCalidadCaladoService,
    private readonly circuitoService: CircuitoService,
    private readonly rubroCalidadService: RubrosCalidadService,
    protected readonly formComponentService: FormComponentService,
    private readonly confirmacionProductoCalado: ConfirmacionProductoCalado,
    protected readonly navigationService: NavigationService,
    private readonly caladoService: CaladoService,
    private readonly grupoRubroAnalisisNotificationService: DropdownNotificationService<GrupoRubroCalidadAnalisis>,
    private readonly authService: AuthService,
    protected readonly commandService: CommandService,
    protected readonly movimientoService: MovimientoService) {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
    }
    this.subscription = this.commandService.commands.subscribe(c => this.handleCommand(c));
    this.esModificacion = false;
  }

  ngOnInit() {
    this.createForm();
    this.subscribeNavigation();
    this.subscribeChanges();
    this.suscribirseCambiosAccion();
  }

  handleCommand(command: Command) {
    switch (command.name) {
      case 'Aceptar':
        this.aceptar();
        break;
      case 'Cancelar':
        this.cancelar();
        break;
      case 'LecturaDispositivo':
        this.onLeerDispositivoClicked();
        break;
      case 'Calcular':
        this.rubrosCalidadComponent.calcularCalidad();
        break;
      case 'RebajaConvenida':
        this.rubrosCalidadComponent.ingresarRebajaConvenida();
        break;
      case 'Agregar':
        this.datosLaboratorioComponent.onClickAgregarMuestraLaboratorio();
        break;
      case 'Eliminar':
        this.datosLaboratorioComponent.onclickEliminarMuestraLaboratorio();
        break;
      case 'ConsultarCaladoAnterior':
        this.openConsultarCalidadAnterior();
        break;
    }
  }

  private createForm() {
    this.ingresarCalidadCaladoForm = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: '', disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      filtroMovimiento: this.fb.group({
        numeroVagon: { value: '', disabled: false },
        patenteCamion: { value: '', disabled: false },
        tarjeta: { value: '', disabled: false }
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        turno: { value: '', disabled: true },
        estadoCupo: { value: '', disabled: true },
        producto: { value: '', disabled: true },
        estado: { value: '', disabled: true },
        entregador: { value: '', disabled: true },
        titular: { value: '', disabled: true },
        destinatario: { value: '', disabled: true },
        sede: { value: '', disabled: true },
        corredor: { value: '', disabled: true },
        vendedor: { value: '', disabled: true },
        ctg: { value: '', disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: [{ value: '', disabled: true }, [requiredIf(this.esFueraCircuito), fechaDebeSerMenorIgualAFechaDelDia()]]
      }),
      rubros: this.fb.group({
        rubrosCalidad: this.fb.array([]),
        numeroSerieDispositivo: { value: '', disabled: true },
        grado: this.fb.group({
          id: { value: '', disabled: true },
          descripcion: { value: '', disabled: true }
        }),
        factor: { value: '', disabled: true }
      }),
      mermasEspeciales: this.fb.array([]),
      accion: this.fb.group({
        accion: { value: '', disabled: true }
      }),
      observaciones: this.fb.group({
        referenciaDestino: { value: undefined, disabled: false },
        observacionLDC: { value: null, disabled: false },
        observacionEntregador: { value: null, disabled: true }
      }),
      datosCamara: this.fb.group({
        tecnologia: { value: false, disabled: true },
        camara: { value: false, disabled: false },
        fechaEnvio: { value: null, disabled: true },
        codigoBarra: [{ value: '', disabled: true }, Validators.required],
        grupoRubroAnalisis: { value: '', disabled: true },
        laboratorio: { value: '', disabled: true }
      }),
      modalImprimeObleaLaboratorio: this.fb.group({
        impresora: { value: '', disabled: false }
      })
    });

    this.formComponentService.initialize(this.ingresarCalidadCaladoForm);
    this.setDefaultValues();
    this.setEnableSections();
    this.disableButtons = true;
    this.habilitaGrillaMermasEspeciales = false;
    this.deshabilitarCalculoCalidad = true;
  }

  completeDataCalado(movimiento: MovimientoCalado | null) {
    if (movimiento) {
      if (!this.esNavegacion) {
        this.navigationService.clearPathCache();
      }
      this.fillSecciones(movimiento);
    } else {
      this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
    }
  }

  onDatosLaboratorioFormReady(datosLaboratorioForm: FormGroup) {
    this.ingresarCalidadCaladoForm.setControl('datosLaboratorio', datosLaboratorioForm);
  }

  fillFormPostNavegacion(extras) {
    if (extras.idMovimiento) {
      this.esNavegacion = true;
      this.operacion = +extras.operacion;
      this.esFueraCircuito = extras.esFueraCircuito === 'true';
      this.esModificacion = this.operacion === Operaciones.Modificacion;

      this.calidadCaladoService.getMovimientoCaladoById(+extras.idMovimiento)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(datos => {
          this.movimiento = datos;
          this.nroDocumentoPorte = this.movimiento.numeroDocumentoPorte;
          this.ctg = this.movimiento.ctg;
          this.esVagon = this.movimiento.idTipoTransporte === TiposTransporte.Tren;
          this.esCarga = this.movimiento.idTipoMovimiento === TiposMovimiento.Carga;
          this.producto = this.movimiento.producto;
          this.ingresarCalidadCaladoForm.controls.filtroMovimiento.patchValue({
            patenteCamion: datos.patenteCamion,
            numeroVagon: datos.numeroVagon,
            tarjeta: datos.nroTarjeta
          });
          this.fillSecciones(this.movimiento);
          this.grupoRubroAnalisisNotificationService.dropdownFilled
            .pipe(
              takeUntil(this.formReady)
            )
            .subscribe(() => {
              if (this.operacion !== Operaciones.Alta) {
                this.prepareForm(datos);
              }
              this.formReady.next();
            });
        });
    } else {
      this.filtroMovimiento.setFocus();
    }
  }

  protected prepareForm(movimientoCalado: MovimientoCalado) {
    this.fillFormConsultaModificacion(movimientoCalado);
    this.setEnableSections();
    this.setEnableFiltroBusqueda(false);
    if (this.operacion === Operaciones.Consulta) {
      this.mostrarAceptar = true;
    }
    this.disableButtons = false;
  }

  protected fillSecciones(movimiento: MovimientoCalado): void {
    this.movimientoService.getVersionDeMovimiento(movimiento.id).pipe(takeUntil(this.onDestroy)).subscribe((version: string) => {
      movimiento.version = version;

      this.completeCircuito(movimiento).pipe(takeUntil(this.onDestroy)).subscribe(() => {
        const movimientoValido = this.validarMovimiento(movimiento);
        if (movimientoValido || this.operacion === Operaciones.Consulta) {
          this.movimiento = movimiento;
          this.nroDocumentoPorte = this.movimiento.numeroDocumentoPorte;
          this.ctg = this.movimiento.ctg;
          if (this.movimiento.tieneMasDeUnaCalidad ||
          (this.operacion === Operaciones.Alta && this.movimiento.esRecalado)) {
            this.popupService.warning(Resources.Messages.ElMovimientoCuentaConAnalisisCalidadPrevio);
          }
          this.esCarga = this.movimiento.idTipoMovimiento === TiposMovimiento.Carga;
          this.producto = movimiento.producto;
          this.completeCircuitoForm();
          this.setEnableFiltroBusqueda(false);
          this.setEnableSections();
          if (movimiento.condicionMermasEspeciales.length > 0) {
            this.habilitaGrillaMermasEspeciales = true;
            this.addMermaEspecial(movimiento.condicionMermasEspeciales);
            setTimeout(() => {
              this.mermasEspecialesComponent.setRows(this.mermasEspeciales);
            }, 0);
          } else {
            this.habilitaGrillaMermasEspeciales = false;
          }
          if (movimiento.idTipoProducto !== TiposProducto.SubProductos &&
            this.operacion !== Operaciones.RegistroDecisionEntregador &&
            this.operacion !== Operaciones.Modificacion &&
            this.operacion !== Operaciones.Consulta) {
            this.completeRubros().pipe(takeUntil(this.onDestroy)).subscribe(() => {
              this.determinarRubrosEnAutomatico().pipe(takeUntil(this.onDestroy)).subscribe(() => {
                this.rubrosCalidadComponent.setFocus();
                const requiereAnalisis = this.ingresarCalidadCaladoForm.get('datosCamada.camara');
                const grupoRubroAnalisis = this.ingresarCalidadCaladoForm.get('datosCamara.grupoRubroAnalisis');
                if (grupoRubroAnalisis && requiereAnalisis && requiereAnalisis.value === true) {
                  this.selectRubrosPorTipoAnalisis(grupoRubroAnalisis.value);
                }
              });
            });
          }
          this.habilitarCaracteristicas();
          this.disableButtons = false;
          this.esAcopio = this.terminal.puerto.esAcopio;
        } else {
          this.movimientoService.desmarcarMovimientoEnPuesto(movimiento.id).pipe(takeUntil(this.onDestroy)).subscribe();
          this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoParaIngresoCalidad);
          this.resetForm();
        }
      });
    });
  }

  private determinarRubrosEnAutomatico(): Observable<void> {
    return this.caladoService.getDispositivoRubrosCalidad(this.movimiento.producto.id)
      .pipe(
        takeUntil(this.onDestroy),
        map(datos => {
          this.lecturaAutomatica = datos.esAutomatico;
          if (datos.esAutomatico) {
            this.rubrosCalidadComponent.rubrosForm.patchValue({ numeroSerieDispositivo: datos.dispositivo.numeroSerie });
            this.rubrosCalidadComponent.deshabilitarRubrosAutomaticos(datos.rubrosCalidad);
          }
        })
      );
  }

  protected abstract getActividades(): number[];

  private completeCircuito(movimiento: MovimientoCalado) {

    this.completarTipoProducto = true;
    return this.circuitoService.getCircuitoByIdByIdsActividad(movimiento.idCircuito, this.getActividades())
      .pipe(
        takeUntil(this.onDestroy),
        map(datos => {
          this.circuito = new Circuito();
          Object.assign(this.circuito, datos);
        })
      );
  }

  private validarMovimiento(movimiento: MovimientoCalado): boolean {
    return this.circuito.validarMovimientoPorEstadoYCircuito(movimiento.estado.id,
      movimiento.idCircuito);
  }

  private completeCircuitoForm() {
    const tipoMovimiento = tiposMovimientos.find(t => t.id === this.movimiento.idTipoMovimiento);
    const tipoTransporte = tiposTransportes.find(t => t.id === this.movimiento.idTipoTransporte);
    const tipoProducto = new TipoProducto(this.movimiento.idTipoProducto, TiposProducto[this.movimiento.idTipoProducto as TiposProducto]);

    if (tipoMovimiento && this.terminal && tipoTransporte) {
      this.formComponentService.setValue(`circuito.terminal`, this.terminal.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`circuito.tipoMovimiento`, tipoMovimiento.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`circuito.tipoProducto`, tipoProducto.descripcion, { onlySelf: true });
      this.formComponentService.setValue(`circuito.tipoTransporte`, tipoTransporte.descripcion, { onlySelf: true });
    }
  }

  private completeRubros() {
    return this.rubroCalidadService.getRubrosCalidad(this.movimiento.producto.id)
      .pipe(
        takeUntil(this.onDestroy),
        map(rubros => {
          this.addRangeRubroCalidad(rubros);
          this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);
          return rubros;
        })
      );
  }

  private setEnableFiltroBusqueda(enable: boolean) {
    enable ? this.ingresarCalidadCaladoForm.controls.filtroMovimiento.enable() :
      this.ingresarCalidadCaladoForm.controls.filtroMovimiento.disable();
  }

  protected abstract subscribeNavigation(): void;

  private subscribeChanges() {
    const grupoRubroAnalisis = this.ingresarCalidadCaladoForm.get('datosCamara.grupoRubroAnalisis');
    if (grupoRubroAnalisis) {
      grupoRubroAnalisis.valueChanges
        .pipe(
          takeUntil(this.onDestroy),
          distinctUntilChanged()
        )
        .subscribe(newValue => {
          this.selectRubrosPorTipoAnalisis(newValue);
          this.setDisableSelectRubro();
        });
    }

    const chkCamara = this.ingresarCalidadCaladoForm.get('datosCamara.camara');
    if (chkCamara) {
      chkCamara.valueChanges
        .pipe(
          takeUntil(this.onDestroy),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.setDisableSelectRubro();
        });
    }

    const chkTecnologia = this.ingresarCalidadCaladoForm.get('datosCamara.tecnologia');
    if (chkTecnologia) {
      chkTecnologia.valueChanges
        .pipe(
          takeUntil(this.onDestroy),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.setDisableSelectRubro();
        });
    }
  }

  private setDisableSelectRubro() {
    const grupoRubroAnalisis = this.ingresarCalidadCaladoForm.get('datosCamara.grupoRubroAnalisis');
    const chkCamara = this.ingresarCalidadCaladoForm.get('datosCamara.camara');
    const chkTecnologia = this.ingresarCalidadCaladoForm.get('datosCamara.tecnologia');
    if (grupoRubroAnalisis && chkCamara && chkTecnologia) {
      if (chkCamara.value && (this.esAcopio || grupoRubroAnalisis.value && grupoRubroAnalisis.value.esEspecial) &&
        this.operacion !== Operaciones.RegistroDecisionEntregador) {
        this.disableSelectRubro = false;
      } else {
        this.disableSelectRubro = true;
        if (this.esAcopio) {
          this.rubrosSelected = [...new Array];
        }
      }
    }
  }

  private selectRubrosPorTipoAnalisis(grupoRubroAnalisis: GrupoRubroCalidadAnalisis, selectedRows?: any[]) {
    const selected = selectedRows || new Array;
    if (selected.length === 0 && grupoRubroAnalisis) {
      grupoRubroAnalisis.rubrosCalidad.forEach(r => {
        const rubro = this.rubrosCalidad.controls.find(rc => rc.value.idRubroCalidad === r.id);
        if (rubro) {
          selected.push(rubro);
        }
      });
    }
    this.rubrosSelected = [...selected];
  }

  private fillFormConsultaModificacion(datos: MovimientoCalado) {
    this.ingresarCalidadCaladoForm.controls.filtroMovimiento.patchValue({
      patenteCamion: datos.patenteCamion,
      numeroVagon: datos.numeroVagon,
      tarjeta: datos.nroTarjeta
    });

    if (datos.ingresoCalidad) {
      this.ingresarCalidadCaladoForm.controls.rubros.patchValue({
        grado: datos.ingresoCalidad.grado !== null ? datos.ingresoCalidad.grado : '',
        factor: datos.ingresoCalidad.factor
      });

      if (this.operacion === Operaciones.Modificacion &&
        datos.idTipoProducto !== TiposProducto.SubProductos) {
        this.completeRubros().pipe(takeUntil(this.onDestroy)).subscribe(rubros => {
          this.ingresarCalidadCaladoForm.controls.rubros.patchValue({
            rubrosCalidad: this.mapRubrosCalidad(datos.ingresoCalidad.rubros, rubros)
          });
          this.eliminarRubrosConValorMedidoCero();
          this.completarDatosCamara(datos.ingresoCalidad);
        });
      } else {
        this.addRangeRubroCalidad(datos.ingresoCalidad.rubros);
        this.ingresarCalidadCaladoForm.controls.rubros.patchValue({
          rubrosCalidad: datos.ingresoCalidad.rubros
        });
        this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);
        this.completarDatosCamara(datos.ingresoCalidad);
      }

      this.ingresarCalidadCaladoForm.controls.observaciones.patchValue({
        referenciaDestino: datos.ingresoCalidad.referenciaDestino,
        observacionLDC: datos.ingresoCalidad.observacionLDC,
        observacionEntregador: datos.ingresoCalidad.observacionEntregador
      });

      this.datosLaboratorioComponent.setDatosLaboratorio(datos.ingresoCalidad.muestrasLaboratorio, datos.ingresoCalidad.decisionLaboratorio,
        datos.ingresoCalidad.observacionesLaboratorio);
    }
  }

  private eliminarRubrosConValorMedidoCero(): void {
    this.rubrosCalidad.controls.forEach((r) => {
      if (!r.value.valorMedido) {
        r.patchValue({ valorMedido: '' });
        r.patchValue({ porcentajeMerma: '' });
        r.patchValue({ porcentajeRebaja: '' });
        r.patchValue({ porcentajeRebajaConvenida: '' });
        r.patchValue({ porcentajeBonificacion: '' });
        r.patchValue({ servicioAcondicionamiento: '' });
      }
    });
  }

  private completarDatosCamara(ingresoCalidad: IngresoCalidad) {
    this.ingresarCalidadCaladoForm.controls.datosCamara.patchValue({
      camara: ingresoCalidad.requiereAnalisisCamara,
      tecnologia: ingresoCalidad.requiereAnalisisPorTecnologia,
      grupoRubroAnalisis: ingresoCalidad.requiereAnalisisCamara ? ingresoCalidad.grupoRubroCalidadAnalisis : null,
      codigoBarra: ingresoCalidad.requiereAnalisisPorTecnologia || ingresoCalidad.requiereAnalisisCamara
        ? ingresoCalidad.codigoBarras : null,
      laboratorio: ingresoCalidad.requiereAnalisisCamara ? ingresoCalidad.laboratorio : null
    });

    if (ingresoCalidad.requiereAnalisisPorTecnologia || ingresoCalidad.requiereAnalisisCamara) {
      const rubrosSeleccionados = this.rubrosCalidad.controls.filter(r => r.value.requiereAnalisis);
      this.selectRubrosPorTipoAnalisis(ingresoCalidad.grupoRubroCalidadAnalisis, rubrosSeleccionados);
    }
  }

  private mapRubrosCalidad(rubrosSource: RubroCalidadMovimientoCereal[],
    rubrosDestination: RubroCalidadMovimientoCereal[]): RubroCalidadMovimientoCereal[] {

    rubrosDestination.forEach(r => {
      const rubro = rubrosSource.find(s => s.idRubroCalidad === r.idRubroCalidad);
      if (rubro) {
        delete rubro.determinaGrado;
        delete rubro.esRequerido;
        r.servicioAcondicionamiento = rubro.servicioAcondicionamiento;
        Object.assign(r, rubro);
      }
    });
    return rubrosDestination;
  }

  aceptar() {
    this.mensajeMerma();
    this.aceptarCalado();
  }

  private resetForm() {
    this.setEnableFiltroBusqueda(true);
    this.setEnableSections();
    this.disableButtons = true;
    this.formComponentService.resetForm({ emitEvent: true });
    this.formComponentService.setValue('filtroMovimiento.patenteCamion', '', { onlySelf: true });
    this.formComponentService.setValue('filtroMovimiento.numeroVagon', '', { onlySelf: true });
    this.formComponentService.setValue('filtroMovimiento.tarjeta', '', { onlySelf: true }, !this.terminal.utilizaTarjeta);
    this.movimiento.esRecalado = false;
    this.setDefaultValues();
    this.clearRubrosCalidadArray();
    this.clearMermaEspecialArray();
    this.datosLaboratorioComponent.resetForm();
    this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);
    setTimeout(() => this.mermasEspecialesComponent.setRows(this.mermasEspeciales), 0);
    setTimeout(() => {
      this.filtroMovimiento.setFocus();
    }, 500);
  }

  private setDefaultValues() {
    const referenciaDestino = this.ingresarCalidadCaladoForm.get('observaciones.referenciaDestino');
    if (referenciaDestino) {
      referenciaDestino.setValidators(
        referenciaDestinoRequeridoSegunActividadValidator(this.ingresarCalidadCaladoForm.controls.accion,
          [AccionesCalidad.AptoDescarga, AccionesCalidad.PendienteEntregador])
      );

      referenciaDestino.setValue(undefined, { onlySelf: true });
    }

    let controlAValidar: AbstractControl | null;

    if (!this.terminal.usaMuestraTipoAcopio) {
      controlAValidar = this.ingresarCalidadCaladoForm.get('datosCamara.grupoRubroAnalisis');
    } else {
      controlAValidar = this.ingresarCalidadCaladoForm.get('datosCamara.laboratorio');
    }

    if (controlAValidar) {
      controlAValidar.setValidators(requeridoSiCheckCamaraTildado(this.ingresarCalidadCaladoForm.controls.datosCamara as FormGroup));
    }
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.ingresarCalidadCaladoForm.get(controlName);
    if (control) {
      control.patchValue(value, options);
      control.reset(value, options);
      control.setValue(value, options);
    }
  }

  private addMermaEspecial(condicionMermasEspeciale: CondicionMermaEspecialDataView[]): void {
    this.clearMermaEspecialArray();
    condicionMermasEspeciale.forEach(c => {
      this.mermasEspeciales.push(this.buildMermaEspecial(c));
    });
  }

  private clearMermaEspecialArray() {
    while (this.mermasEspeciales.length !== 0) {
      this.mermasEspeciales.removeAt(0);
    }
  }

  private buildMermaEspecial(condicionMermaEspecial: CondicionMermaEspecialDataView): FormGroup {
    return this.fb.group({
      id: condicionMermaEspecial.id,
      descripcion: condicionMermaEspecial.descripcion,
      porcentajeMerma: condicionMermaEspecial.porcentajeMerma,
      afectaStock: condicionMermaEspecial.afectaStock,
      aftectaAplicacion: condicionMermaEspecial.afectaAplicacion,
      recuperaMerma: condicionMermaEspecial.recuperaMerma
    });
  }

  private addRangeRubroCalidad(rubros: RubroCalidadMovimientoCereal[]): void {
    this.clearRubrosCalidadArray();
    rubros.forEach(r => {
      this.rubrosCalidad.push(this.buildRubroCalidad(r));
    });
  }

  private clearRubrosCalidadArray() {
    while (this.rubrosCalidad.length !== 0) {
      this.rubrosCalidad.removeAt(0);
    }
  }

  private buildRubroCalidad(rubro: RubroCalidadMovimientoCereal): FormGroup {
    const rubroCalidadFormGroup = this.fb.group({
      id: rubro.id,
      descripcion: rubro.descripcion,
      porcentajeBonificacion: rubro.porcentajeBonificacion,
      porcentajeRebaja: rubro.porcentajeRebaja,
      porcentajeMerma: rubro.porcentajeMerma,
      porcentajeRebajaConvenida: rubro.porcentajeRebajaConvenida,
      valorMedido: [
        { value: rubro.valorMedido, disabled: this.operacion === Operaciones.Consulta },
        [
          requiredIf(rubro.esRequerido && !this.esAccionPendienteSupervisor),
          minIf(this.operacion !== Operaciones.RegistroDecisionEntregador ? rubro.valorMinimo : null),
          maxIf(this.operacion !== Operaciones.RegistroDecisionEntregador ? rubro.valorMaximo : null)
        ]
      ],
      lecturaAutomatica: rubro.lecturaAutomatica,
      servicioAcondicionamiento: rubro.servicioAcondicionamiento,
      esRequerido: rubro.esRequerido,
      determinaGrado: rubro.determinaGrado,
      requiereAnalisis: rubro.requiereAnalisis,
      idRubroCalidad: rubro.idRubroCalidad,
      valorMinimo: rubro.valorMinimo,
      valorMaximo: rubro.valorMaximo,
      kgPesoMerma: rubro.kgPesoMerma
    });
    return rubroCalidadFormGroup;
  }

  protected aceptarCalado(): void {
    if (this.isValidForm()) {
      if (this.movimiento) {

        this.confirmacionProductoCalado.confirm(this.movimiento.producto.id).then(confirmo => {

          if (!confirmo) {
            return;
          } else {

            const calidad = new CalculoCalidad();
            calidad.medicionesRubrosCalidad = (this.rubrosCalidad.getRawValue() as MedicionDeRubro[])
              .filter(rubro => rubro.valorMedido > 0);

            calidad.idProducto = this.movimiento.producto.id;
            calidad.idFinalidad = this.movimiento.idFinalidad;
            calidad.idTipoMovimiento = this.movimiento.idTipoMovimiento;
            calidad.idCorredor = this.movimiento.idCorredor;
            calidad.idVendedor = this.movimiento.idVendedor;

            // TODO AL: nunca deberia llegar un peso neto negativo.
            if (this.movimiento.kgPesoNeto > 0) {
              calidad.kgPesoNetoBalanza = this.movimiento.kgPesoNeto;
            }

            this.calidadCaladoService.CalcularCalidad(calidad).pipe(takeUntil(this.onDestroy)).subscribe(respuesta => {

              respuesta.alertas.forEach(alerta => {
                this.popupService.warning(alerta);
              });

              this.rubrosCalidadComponent.setearRubros(respuesta);
              this.determinarAccionPosCalado().pipe(takeUntil(this.onDestroy)).subscribe(datos => {

                this.validarAccion(datos.accion).then(validAccion => {
                  if (validAccion) {

                    this.validarEnvioCamara(datos.requiereAnalisisCamaraPorDefecto).then(validCamara => {
                      if (validCamara) {
                        if (this.imprimeObleaLaboratorio) {
                          this.modalImprimeObleaLaboratorioAbierto = true;
                          this.modalConfirmarImpresionObleaLaboratorioComponent.open();
                        } else {
                          this.registrarMovimientoCalado();
                        }
                      }
                    });
                  }
                });
              });
            });
          }
        });
      }
    } else {
      const errors = new Collection<string>();
      this.formComponentService.validateForm(this.ingresarCalidadCaladoForm.controls, errors, '');
      this.formComponentService.showValidationError(errors);
    }
  }

  private continuar(): void {
    this.esContinuar = !this.esContinuar;
    const accion = this.ingresarCalidadCaladoForm.get('accion.accion');
    const navigationExtras: NavigationExtras = {
      queryParams: {
        'idMovimiento': this.movimiento.id,
        'operacion': Operaciones.Alta
      }
    };
    if (navigationExtras.queryParams) {
      if (accion && accion.value === AccionesCalidad.PendienteEntregador) {
        navigationExtras.queryParams.operacion = Operaciones.RegistroDecisionEntregador;
      } else if (accion && accion.value === AccionesCalidad.PendienteSupervisor) {
        navigationExtras.queryParams.operacion = Operaciones.Modificacion;
      }
    }
    this.destroyedByNavigation = true;
    setTimeout(() => this.navigationService.navigateByMovement(this.movimiento.id, this.basePath, navigationExtras), 1500);
  }

  private isValidForm(): boolean {

    const referenciaDestino = this.ingresarCalidadCaladoForm.get('observaciones.referenciaDestino');
    this.formComponentService.forceValidationCheck(referenciaDestino);

    const codigoBarras = this.ingresarCalidadCaladoForm.get('datosCamara.codigoBarra');
    this.formComponentService.forceValidationCheck(codigoBarras);

    const grupoRubroAnalisis = this.ingresarCalidadCaladoForm.get('datosCamara.grupoRubroAnalisis');
    this.formComponentService.forceValidationCheck(grupoRubroAnalisis);

    const laboratorio = this.ingresarCalidadCaladoForm.get('datosCamara.laboratorio');
    this.formComponentService.forceValidationCheck(laboratorio);

    const camara = this.ingresarCalidadCaladoForm.get('datosCamara.camara');
    if (camara && camara.value && !this.rubrosCalidad.controls.some(r => r.value.requiereAnalisis)) {
      this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnRubroParaCamara);
      return false;
    }

    return this.formComponentService.isValidForm();
  }

  private determinarAccionPosCalado() {

    const accionPosCalado = new AccionPosCalado();
    accionPosCalado.resultadosRubrosCalidad = this.rubrosCalidad.getRawValue();
    accionPosCalado.idProducto = this.movimiento.producto.id;
    accionPosCalado.idGrado = this.formComponentService.getValue('rubros.grado');

    return this.calidadCaladoService.DeterminarAccionPosCalado(accionPosCalado).pipe(
      map(datos => {
        return datos;
      })
    );
  }

  private suscribirseCambiosAccion() {
    const accion = this.ingresarCalidadCaladoForm.get('accion.accion');
    if (accion) {

      accion.valueChanges
        .pipe(
          takeUntil(this.onDestroy),
          distinctUntilChanged()
        )
        .subscribe(() => {
          this.addRangeRubroCalidad(this.rubrosCalidad.getRawValue());
          this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);
          this.rubrosCalidad.controls.forEach(c => this.formComponentService.forceValidationCheck(c));
          this.rubrosSelected = [...this.rubrosCalidad.controls.filter(c => c.value.requiereAnalisis)];
        });
    }
  }

  private validarAccion(accionATomar: AccionCalado): Promise<boolean> {
    if (!this.esFueraCircuito) {
      const accionPendienteEntregador = this.accionesHabilitadas.some(function (obj) {
        return obj.accion === 'pendienteEntregadorActivado' && obj.activada === true;
      });

      if (accionATomar.id === AccionesCalidad.PendienteEntregador &&
        !accionPendienteEntregador) {
        accionATomar.id = AccionesCalidad.PendienteSupervisor;
        accionATomar.descripcion = Resources.Labels.PendienteSupervisor;
      }

      const accion = this.ingresarCalidadCaladoForm.get('accion.accion');
      if (accion && accionATomar.id && this.debeConfirmarAccion(accionATomar, accion.value)) {
        return this.popupService.confirm(Resources.Messages.ControleAccionATomarCalado + accionATomar.descripcion)
          .then(confirmo => {
            return confirmo;
          });
      }
    }

    return Promise.resolve(true);
  }

  private debeConfirmarAccion(accionATomar: AccionCalado, accionActual: number): boolean {
    const accionDistintaALaQueElUsuarioTomo = accionATomar.id !== accionActual;
    const noEsRegistrarDecisionEntregador = this.operacion !== Operaciones.RegistroDecisionEntregador;
    const esAltaOModificacionYAccionATomarNoEsPendienteSupervisor = this.operacion !== Operaciones.Modificacion ||
      (this.operacion === Operaciones.Modificacion &&
        accionATomar.id !== AccionesCalidad.PendienteSupervisor);

    return accionDistintaALaQueElUsuarioTomo && noEsRegistrarDecisionEntregador && esAltaOModificacionYAccionATomarNoEsPendienteSupervisor;
  }

  private validarEnvioCamara(requiereAnalisisCamaraPorDefecto: boolean): Promise<boolean> {
    if (!this.terminal.usaMuestraTipoAcopio && this.caracteristicaCamaraHabilitada) {
      const camara = this.ingresarCalidadCaladoForm.get('datosCamara.camara');
      const tecnologia = this.ingresarCalidadCaladoForm.get('datosCamara.tecnologia');

      if (camara && tecnologia &&
        camara.value != null && !tecnologia.value &&
        camara.value !== requiereAnalisisCamaraPorDefecto) {

        const message = requiereAnalisisCamaraPorDefecto ? Resources.Messages.DeberiaEnviarMuestraACamara :
          Resources.Messages.NoDeberiaEnviarMuestraACamara;
        return this.popupService.confirm(message)
          .then(confirmo => {
            return confirmo;
          });
      }
    }
    return Promise.resolve(true);
  }

  protected abstract getPartialPath();

  private registrarMovimientoCalado(confirmaImpresionObleaLaboratorio?: boolean): void {
    const command = this.mapControlsToRegistrarCommand();
    const partialPath = this.getPartialPath();
    if (partialPath) {
      this.disableButtons = true;
      command.imprimeEnReimpresion = confirmaImpresionObleaLaboratorio;
      this.calidadCaladoService.RegistrarCalidad(command, partialPath).pipe(takeUntil(this.onDestroy))
        .subscribe(() => {
          this.popupService.success('¡Se Aceptó el ingreso de la calidad!', Resources.Labels.Aceptar);
          if (this.esContinuar) {
            this.continuar();
          } else if (this.debeNavegarAtras()) {
            this.destroyedByNavigation = true;
            setTimeout(() => {
              if (this.operacion === Operaciones.Alta) {
                this.navigationService.navigateBackToSource();
              } else {
                this.navigationService.navigateBack();
              }
            }, 1500);
          }
          this.resetForm();
        }, () => this.disableButtons = false);
    }
  }

  private debeNavegarAtras(): boolean {
    return this.esNavegacion &&
    (this.operacion !== Operaciones.Alta || this.navigationService.isFromGestionarTransporteCircuito());
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.onDestroy.next();
    this.onDestroy.complete();
    if (!this.destroyedByNavigation) {
      this.navigationService.clearCache();
    }
  }

  openConsultarCalidadAnterior(): void {
    if (this.movimiento) {
      this.showCalidadAnterior = true;
      this.consultarCalidad.abrir(this.movimiento.id, this.producto, this.nroDocumentoPorte, this.esCarga);
    }
  }

  closeConsultarCalidadAnterior(): void {
    setTimeout(() => {
      this.showCalidadAnterior = false;
    }, 500);
  }

  onLeerDispositivoClicked(): void {
    this.rubrosCalidadComponent.lecturaDispositivoRealizada = true;
    const ctlTarjeta = this.ingresarCalidadCaladoForm.get('filtroMovimiento.tarjeta');
    if (ctlTarjeta) {
      this.disableButtons = true;
      this.caladoService.medirRubrosCalidad(this.producto.id, this.movimiento.id, this.movimiento.idTipoMovimiento, ctlTarjeta.value)
        .pipe(takeUntil(this.onDestroy))
        .subscribe(datos => {
          this.disableButtons = false;
          datos.medicionesRubrosCalidad.forEach((med) => {
            const indx = this.rubrosCalidad.value.findIndex(rc => rc.idRubroCalidad === med.idRubroCalidad);
            this.rubrosCalidad.at(indx).patchValue({ valorMedido: med.valorMedido });
          });
        }, (error: HttpErrorResponse) => {
          this.disableButtons = false;
          if (error.status === HttpStatus.BAD_GATEWAY) {
            this.popupService.error(error.error.message, 'Error de Conexión');
          }
        });
    }
  }

  private setEnableSections() {
    if (this.operacion === Operaciones.Modificacion || this.operacion === Operaciones.Alta) {
      this.ingresarCalidadCaladoForm.controls.rubros.enable();
      this.ingresarCalidadCaladoForm.controls.observaciones.enable();
      this.movimiento ? this.ingresarCalidadCaladoForm.controls.accion.enable() : this.ingresarCalidadCaladoForm.controls.accion.disable();
      this.habilitarReferenciaDestinoSegunCaracteristica();
    } else if (this.operacion === Operaciones.Consulta) {
      this.ingresarCalidadCaladoForm.controls.rubros.disable();
      this.ingresarCalidadCaladoForm.controls.observaciones.disable();
      this.disableSelectRubro = true;
    } else if (this.operacion === Operaciones.RegistroDecisionEntregador || this.operacion === Operaciones.ContinuarCircuitoPostLab) {
      this.ingresarCalidadCaladoForm.controls.accion.enable();
      this.ingresarCalidadCaladoForm.controls.observaciones.disable();
      this.ingresarCalidadCaladoForm.controls.datosCamara.disable();
      this.ingresarCalidadCaladoForm.controls.rubros.disable();
    }

    const observacionEntregador = this.ingresarCalidadCaladoForm.get('observaciones.observacionEntregador');
    if (observacionEntregador) {
      if (this.operacion !== Operaciones.RegistroDecisionEntregador) {
        observacionEntregador.disable();
      } else {
        observacionEntregador.enable();
      }
    }

    const grado = this.ingresarCalidadCaladoForm.get('rubros.grado');
    if (grado) {
      grado.disable();
    }

    const factor = this.ingresarCalidadCaladoForm.get('rubros.factor');
    if (factor) {
      factor.disable();
    }

    const numeroSerieDispositivo = this.ingresarCalidadCaladoForm.get('rubros.numeroSerieDispositivo');
    if (numeroSerieDispositivo) {
      numeroSerieDispositivo.disable();
    }

    const tecnologia = this.ingresarCalidadCaladoForm.get('datosCamara.tecnologia');
    if (tecnologia) {
      tecnologia.disable();
    }
  }

  habilitarCaracteristicas() {
    // Habilitación de filtro de tarjeta
    const tarjeta = this.ingresarCalidadCaladoForm.get('filtroMovimiento.tarjeta');
    if (tarjeta && this.circuito.debeActivarCaracteristica([Caracteristicas.TarjetaHabilitada])) {
      tarjeta.disable();
    }

    // Habilitación de acciones correspondientes
    const caracteristicaPendienteLaboratorioActiva = this.circuito.debeActivarCaracteristica([
      Caracteristicas.AccionCaladoPendienteLaboratiorio]);

    this.accionesHabilitadas = [
      {
        accion: 'aptoDescargaActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionCaladoAptoDescarga])
      }, {
        accion: 'aceptarCalidadActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionCaladoAceptarCalidad])
      }, {
        accion: 'rechazarActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionCaladoRechazar])
      }, {
        accion: 'pendienteSupervisorActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionCaladoPendienteSupervisor])
      }, {
        accion: 'pendienteEntregadorActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionCaladoPendienteEntregador])
      }, {
        accion: 'pendienteLaboratorioActivado',
        activada: caracteristicaPendienteLaboratorioActiva
      }
    ];

    let desactivaLaboratorioCaracteristica = !caracteristicaPendienteLaboratorioActiva;
    let desactivaLaboratorioSiNoRecala = false;

    if (this.movimiento && (this.esModificacion || this.operacion === Operaciones.ContinuarCircuitoPostLab)) {
      if (this.movimiento.estado) {
        // Permitir la modificación de muestras si el estado está Apto Laboratorio, si no escuchar característica
        desactivaLaboratorioCaracteristica = (!caracteristicaPendienteLaboratorioActiva &&
          this.movimiento.estado.id !== EstadosMovimiento.AptoLaboratorio);
      }
      if (this.movimiento.ingresoCalidad && this.movimiento.ingresoCalidad.decisionLaboratorio) {
        // Permitir la modificación de muestras en modificación normal, si la decisión de laboratorio fué Recalar
        desactivaLaboratorioSiNoRecala = this.movimiento.ingresoCalidad.decisionLaboratorio.id !== DecisionesLaboratorio.ReCalar;
      }
    }

    const disableDatosLaboratorios = desactivaLaboratorioCaracteristica ||
                                     desactivaLaboratorioSiNoRecala ||
                                     this.operacion === Operaciones.Consulta ||
                                     this.operacion === Operaciones.RegistroDecisionEntregador;
    this.datosLaboratorioComponent.setDisabledState(disableDatosLaboratorios);

    if (this.operacion !== Operaciones.Consulta) {
      if (caracteristicaPendienteLaboratorioActiva) {
        this.setValue(`accion.accion`, AccionesCalidad.PendienteLaboratorio, {});
      } else {
        this.setValue(`accion.accion`, AccionesCalidad.AptoDescarga, {});
      }
    }

    // Habilitación de asignación de referencia de destino
    this.habilitarReferenciaDestinoSegunCaracteristica();

    // Habilitación de cálculo de calidad
    this.deshabilitarCalculoCalidad = !this.circuito.debeActivarCaracteristica([Caracteristicas.CalculaCalidadSAN]);

    this.caracteristicaCamaraHabilitada = this.circuito.debeActivarCaracteristica([Caracteristicas.EnviarACamara]);
    const disableDatosCamara = !this.caracteristicaCamaraHabilitada || (this.operacion === Operaciones.Consulta ||
      this.operacion === Operaciones.RegistroDecisionEntregador);
    this.datosCamaraComponent.setDisabledState(disableDatosCamara);
  }

  private habilitarReferenciaDestinoSegunCaracteristica() {
    const referenciaDestino = this.ingresarCalidadCaladoForm.get('observaciones.referenciaDestino');
    if (referenciaDestino && this.circuito) {
      if (!this.circuito.debeActivarCaracteristica([Caracteristicas.AsignacionReferenciaDestino])) {
        referenciaDestino.disable();
      } else {
        if (this.operacion !== Operaciones.Consulta) {
          referenciaDestino.enable();
        }
      }
    }
  }

  cancelar() {
    if (this.operacion === Operaciones.Modificacion) {
      this.popupService.warning('Se Canceló el ingreso de calidad.', 'Cancelar');
      this.destroyedByNavigation = true;
      setTimeout(() => this.navigationService.navigateBack() , 1000);
    } else if (this.operacion === Operaciones.Alta && this.navigationService.isFromGestionarTransporteCircuito()) {
      this.destroyedByNavigation = true;
      this.navigationService.navigateBackToSource();
    } else if (this.esNavegacion) {
      this.destroyedByNavigation = true;
      this.navigationService.navigateBack();
    }
    this.resetForm();
  }

  private mapControlsToRegistrarCommand(): IngresarCalidadCommand {
    const idMovimiento = this.movimiento.id;
    const rubrosCalidad = this.rubrosCalidad.getRawValue() as RubroCalidadMovimientoCereal[];
    const mermasEspeciales = this.mermasEspeciales.getRawValue() as CondicionMermaEspecialCommand[];
    const factor = this.formComponentService.getValue('rubros.factor');
    const idGrado = this.formComponentService.getValue('rubros.grado');
    const idReferenciaDestino = this.formComponentService.getValue('observaciones.referenciaDestino');
    const observacionLDC = this.formComponentService.getValue('observaciones.observacionLDC');
    const observacionEntregador = this.formComponentService.getValue('observaciones.observacionEntregador');
    const idGrupoRubroAnalisis = this.formComponentService.getValue('datosCamara.grupoRubroAnalisis');
    const idLaboratorio = this.formComponentService.getValue('datosCamara.laboratorio');
    const requiereAnalisisPorTecnologia = this.formComponentService.getValue('datosCamara.tecnologia');
    const requiereAnalisisCamara = this.formComponentService.getValue('datosCamara.camara');
    const codigoBarras = this.formComponentService.getValue('datosCamara.codigoBarra');
    const idImpresora = this.formComponentService.getValue('modalImprimeObleaLaboratorio.impresora');

    const command = new IngresarCalidadCommand(idMovimiento, rubrosCalidad, factor, idGrado, idReferenciaDestino);
    command.observacionLDC = observacionLDC;
    command.observacionEntregador = observacionEntregador;
    command.idGrupoRubroAnalisis = idGrupoRubroAnalisis;
    command.idLaboratorio = idLaboratorio;
    command.requiereAnalisisPorTecnologia = requiereAnalisisPorTecnologia;
    command.requiereAnalisisCamara = requiereAnalisisCamara;
    command.codigoBarras = codigoBarras;
    command.muestrasLaboratorio = this.datosLaboratorioComponent.muestrasLaboratorio;
    command.condicionMermasEspeciales = mermasEspeciales;
    command.esModificacion = (this.operacion === Operaciones.Modificacion ||
      this.operacion === Operaciones.RegistroDecisionEntregador ||
      this.operacion === Operaciones.ContinuarCircuitoPostLab);
    command.esRegistroDecisionEntregador = this.operacion === Operaciones.RegistroDecisionEntregador;
    if (this.esFueraCircuito) {
      command.fechaStockSan = String(this.formComponentService.getValue('fechaPeriodoStockSan.fechaStock'));
    }
    command.version = this.movimiento.version;
    if (this.imprimeObleaLaboratorio) {
      command.idImpresora = idImpresora;
    }

    return command;
  }

  confirmaImpresionOblea(confirma: boolean): void {
    if (this.modalImprimeObleaLaboratorioAbierto) {
      this.modalImprimeObleaLaboratorioAbierto = false;
      this.registrarMovimientoCalado(!confirma);
    }
  }

  mensajeMerma(): void {
    if ((this.operacion === Operaciones.Alta || this.esModificacion) &&
        this.terminal.puerto.esAcopio &&
        !this.movimiento.tieneNotificacionMermasEspecialesParametrizadas &&
        this.movimiento.idTipoMovimiento === TiposMovimiento.Descarga) {
      this.popupService.warning(Resources.Messages.NoSeEncuentraConfiguradaNotificacionPorFaltaDeParametrizacionMermasEspeciales);
    }
  }
}

