import { Component, OnInit, OnDestroy, ViewChild, AfterViewInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { Producto } from '../../../shared/data-models/producto';
import { Titular } from '../../../shared/data-models/titular';
import { Productos, Actividades, Operaciones, TiposProducto, GrupoProducto, TiposMovimiento } from '../../../shared/enums/enums';
import { DatosMovimientoModificarProductoFueraCircuitoComponent } from './datos-movimiento-modificar-producto-fuera-circuito/datos-movimiento-modificar-producto-fuera-circuito.component';
import { NavigationService } from '../../../core/services/navigationService/navigation.service';
import { MovimientoService } from '../../shared/services/movimiento.service';
import { tiposTransportes } from '../../../shared/data-models/tipo-transporte';
import { tiposMovimientos } from '../../../shared/data-models/tipo-movimiento';
import { CircuitoService } from '../../shared/services/circuito.service';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { MovimientoCerealGrano } from '../../../shared/data-models/movimiento-cereal-grano';
import { AuthService } from '../../../core/services/session/auth.service';
import { Terminal } from '../../../shared/data-models/terminal';
import { RubrosCalidadService } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.service';
import { RubrosCalidadComponent } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.component';
import { RubroCalidadMovimientoCereal } from '../../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';
import { ModificarProductoFueraCircuitoCommand } from './modificar-producto-fuera-circuito-command';
import { ModificarProductoFueraCircuitoService } from './service/modificar-producto-fuera-circuito.service';
import { fechaDebeSerMenorIgualAFechaDelDia } from '../../shared/validators/fecha.validator';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Collection } from '../../../core/models/collection';
import { DesplegableProductoPorGrupoComponent } from '../../../shared/desplegable-producto-por-grupo/desplegable-producto-por-grupo.component';
import { requiredIf } from '../../shared/validators/requiredIf.validator';
import { CalidadMovimientoCerealService } from '../../shared/services/calidad-movimiento-cereal.service';
import { ValoresCalidad } from '../../../shared/data-models/ingreso-calidad/valores-calidad';
import { ResultadoCalculoCalidad } from '../../../shared/data-models/calculo-calidad/resultado-calculo-calidad';
import { ResultadoMedicionDeRubro } from '../../../shared/data-models/calculo-calidad/resultado-medicion-rubro';
import { IngresarCalidadCaladoService } from '../../ingresar-calidad-calado/ingresar-calidad-calado.service';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { CampoEpaSustentable } from '../../../shared/data-models/campo-epa-sustentable';
import { minIf } from '../../shared/validators/minIf.validator';
import { maxIf } from '../../shared/validators/maxIf.validator';

@Component({
  selector: 'yrd-modificar-producto-fuera-circuito',
  templateUrl: './modificar-producto-fuera-circuito.component.html',
  styleUrls: ['./modificar-producto-fuera-circuito.component.css']
})
export class ModificarProductoFueraCircuitoComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('datosMovimiento') datosMovimiento: DatosMovimientoModificarProductoFueraCircuitoComponent;
  @ViewChild('rubrosCalidadComponent') rubrosCalidadComponent: RubrosCalidadComponent;
  @ViewChild('desplegableProducto') desplegableProducto: DesplegableProductoPorGrupoComponent;
  form: FormGroup;
  producto: Producto;
  fillCosecha = true;
  titular: Titular;
  fillCampoEpa = false;
  operacion = Operaciones.Alta;
  rubrosSelected: any[] = [];
  idMovimiento: number;
  idProductoOriginal: number;
  idTipoProducto: number;
  idTipoTransporte: number;
  idTipoMovimiento: number;
  ControlPath = 'ModificarProductoFueraCircuito';
  GestionarMovimientosPath = 'GestionarMovimientos';
  hideCampoEpa = true;
  hideCalidad = true;
  private circuito: Circuito;
  private readonly idActividad: number;
  protected readonly onDestroy = new Subject();
  terminal: Terminal;
  esAcopio = false;
  movimiento: MovimientoCalado;
  esProductoSeleccionadoElProductoOriginal = true;

  get esCarga(): boolean {
    return this.idTipoMovimiento === TiposMovimiento.Carga;
  }

  get esDescarga(): boolean {
    return this.idTipoMovimiento === TiposMovimiento.Descarga;
  }

  get rubrosCalidad(): FormArray {
    return this.form.get('rubros.rubrosCalidad') as FormArray;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly navigationService: NavigationService,
              private readonly movimientoService: MovimientoService,
              private readonly calidadCaladoService: IngresarCalidadCaladoService,
              private readonly circuitoService: CircuitoService,
              private readonly formComponentService: FormComponentService,
              private readonly authService: AuthService,
              private readonly rubroCalidadService: RubrosCalidadService,
              private readonly modificarProductoFueraCircuitoService: ModificarProductoFueraCircuitoService,
              private readonly popupService: PopupService,
              private readonly calidadMovimientoCerealService: CalidadMovimientoCerealService) {
    this.idActividad = Actividades.ModificarProductoFueraCircuito;
    const userContext = this.authService.getUserContext();
    if (userContext) {
      this.terminal = userContext.terminal;
      this.esAcopio = this.terminal.puerto.esAcopio;
    }
  }

  ngOnInit() {
    this.createForm();
    this.formComponentService.initialize(this.form);
    this.suscripcionesCambios();
    this.subscribeNavigation();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  ngAfterViewInit() {
    this.desplegableProducto.setFocus();
  }

  protected subscribeNavigation() {
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((params) => {
        if (params['idMovimiento'] && params['idTipoProducto']) {
          this.idMovimiento = +params['idMovimiento'];
          this.idTipoProducto = +params['idTipoProducto'];
          this.idTipoTransporte = +params['idTipoTransporte'];
          this.idTipoMovimiento = +params['idTipoMovimiento'];
          this.buscarMovimiento();
        }
      });
  }

  protected buscarMovimiento() {
    this.calidadCaladoService.getMovimientoCaladoById(this.idMovimiento)
      .pipe(takeUntil(this.onDestroy))
      .subscribe((datos) => {
        this.movimiento = datos;
      });

      if (this.esCarga) {
        this.movimientoService.getMovimientoCarga(this.idMovimiento, this.idTipoProducto)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((movimiento: MovimientoCerealGrano) => {
          this.loadMovimiento(movimiento);
          this.getCircuito();
        });
      } else {
        this.movimientoService.getMovimientoDescarga(this.idMovimiento, this.idTipoProducto, this.idTipoTransporte)
        .pipe(takeUntil(this.onDestroy))
        .subscribe((movimiento: MovimientoCerealGrano) => {
          this.loadMovimiento(movimiento);
          this.getCircuito();
        });
      }
  }

  private getCalidadMovimiento() {
    this.calidadMovimientoCerealService.getCalidadVigente(this.idMovimiento).pipe(takeUntil(this.onDestroy))
    .subscribe((calidad: ValoresCalidad) => {
      if (calidad) {
        this.asignarValoresAComponenteRubrosDeCalidad(calidad);
      }
    });
  }

  private asignarValoresAComponenteRubrosDeCalidad(datos: ValoresCalidad): void {

    const datosDelResultadoDeCalidad = new ResultadoCalculoCalidad();
    datosDelResultadoDeCalidad.factor = datos.factor;

    if (datos.grado != null) {
      datosDelResultadoDeCalidad.grado = datos.grado;
    }

    datos.rubros.forEach(rubro => {
      const resultadoMedicionDeRubro = new ResultadoMedicionDeRubro();

      resultadoMedicionDeRubro.idRubroCalidad = rubro.idRubroCalidad;
      resultadoMedicionDeRubro.valorMedido = rubro.valorMedido;
      resultadoMedicionDeRubro.porcentajeBonificacion = rubro.porcentajeBonificacion;
      resultadoMedicionDeRubro.porcentajeMerma = rubro.porcentajeMerma;
      resultadoMedicionDeRubro.porcentajeRebaja = rubro.porcentajeRebaja;
      resultadoMedicionDeRubro.porcentajeRebajaConvenida = rubro.porcentajeRebajaConvenida;
      resultadoMedicionDeRubro.kgPesoMerma = rubro.kgPesoMerma;

      if (rubro.servicioAcondicionamiento != null) {
        resultadoMedicionDeRubro.servicioAcondicionamiento = rubro.servicioAcondicionamiento;
      }

      datosDelResultadoDeCalidad.resultadosRubrosCalidad.push(resultadoMedicionDeRubro);
    });

    this.rubrosCalidadComponent.setearRubros(datosDelResultadoDeCalidad);
  }

  private completeRubros(idProducto: number, esProductoSeleccionadoElProductoOriginal: boolean, esGrupoSoja: boolean) {

    return this.rubroCalidadService.getRubrosCalidad(idProducto).pipe(takeUntil(this.onDestroy))
    .subscribe(rubrosRecuperados => {
      this.addRangeRubroCalidad(rubrosRecuperados);
      this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);

      if (esProductoSeleccionadoElProductoOriginal || esGrupoSoja) {
        this.getCalidadMovimiento();

      } else if (!esGrupoSoja) {

        this.rubrosCalidad.controls.forEach(rubro => {
          rubro.patchValue({ valorMedido: null });
          rubro.patchValue({ porcentajeMerma: null });
          rubro.patchValue({ porcentajeRebaja: null });
          rubro.patchValue({ porcentajeRebajaConvenida: null });
          rubro.patchValue({ porcentajeBonificacion: null });
          rubro.patchValue({ servicioAcondicionamiento: null });
        });
        this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);
      }

      if (esProductoSeleccionadoElProductoOriginal) {
        this.formComponentService.disableControl('rubros.rubrosCalidad');
      }
    });
  }

  private addRangeRubroCalidad(rubros: RubroCalidadMovimientoCereal[]): void {
    this.clearRubrosCalidadArray();
    rubros.forEach(r => {
      this.rubrosCalidad.push(this.buildRubroCalidad(r));
    });
  }

  private buildRubroCalidad(rubro: RubroCalidadMovimientoCereal): FormGroup {
    const rubroCalidadFormGroup = this.fb.group({
      id: rubro.id,
      idRubroCalidad: rubro.idRubroCalidad,
      descripcion: rubro.descripcion,
      porcentajeBonificacion: rubro.porcentajeBonificacion,
      porcentajeRebajaConvenida: rubro.porcentajeRebajaConvenida,
      porcentajeMerma: rubro.porcentajeMerma,
      valorMedido: [rubro.valorMedido, [requiredIf(rubro.esRequerido), minIf(rubro.valorMinimo), maxIf(rubro.valorMaximo)]],
      servicioAcondicionamiento: rubro.servicioAcondicionamiento,
      esRequerido: rubro.esRequerido,
      determinaGrado: rubro.determinaGrado,
      requiereAnalisis: rubro.requiereAnalisis,
      porcentajeRebaja: rubro.porcentajeRebaja,
      kgPesoMerma: rubro.kgPesoMerma,
      valorMinimo: rubro.valorMinimo,
      valorMaximo: rubro.valorMaximo
    });

    return rubroCalidadFormGroup;
  }

  private clearRubrosCalidadArray() {
    while (this.rubrosCalidad.length !== 0) {
      this.rubrosCalidad.removeAt(0);
    }
  }

  protected getCircuito() {
    const idTipoProducto = this.idTipoProducto;
    const idTipoMovimiento = tiposMovimientos[1].id;
    const idTipoTransporte = this.idTipoTransporte;

    this.circuitoService.getCircuito(idTipoMovimiento, idTipoTransporte, idTipoProducto, [this.idActividad])
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        this.circuito = new Circuito();
        Object.assign(this.circuito, datos);
      });
  }

  private createForm() {
    this.form = this.fb.group({
      circuito: this.fb.group({
        terminal: { value: this.terminal.descripcion, disabled: true },
        tipoMovimiento: { value: '', disabled: true },
        tipoTransporte: { value: '', disabled: true },
        tipoProducto: { value: '', disabled: true }
      }),
      fechaPeriodoStockSan: this.fb.group({
        fechaStock: [{ value: undefined, disabled: false }, [Validators.required, fechaDebeSerMenorIgualAFechaDelDia()]]
      }),
      datosMovimiento: this.fb.group({
        tipoDocumentoPorte: { value: '', disabled: true },
        nroDocumentoPorte: { value: '', disabled: true },
        patenteCamion: { value: '', disabled: true },
        vagon: { value: '', disabled: true },
        titular: { value: '', disabled: true },
        fechaEntrada: { value: '', disabled: true },
        fechaOperacion: { value: '', disabled: true },
        fechaSalida: { value: '', disabled: true },
        netoBalanza: { value: '', disabled: true }
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
      producto: { value: undefined, disabled: false },
      campoEpa: { value: undefined, disabled: true },
      sustentable: { value: undefined, disabled: true },
      cosecha: { value: undefined, disabled: false },
      procedencia: [{ value: undefined, disabled: false }, Validators.required],
      silo: { value: undefined, disabled: false }
    });
  }

  private suscripcionesCambios() {
    this.suscribirseCambioProducto();
    this.suscribirseCambioSustentabilidad();
    this.suscribirseCambioCampoEpaSustentable();
  }

  private suscribirseCambioCampoEpaSustentable() {
    const campoEpa = this.form.get('campoEpa');
    const producto = this.form.get('producto');
    const sustentable = this.form.get('sustentable');
    if (campoEpa && producto) {
      campoEpa.valueChanges.pipe(takeUntil(this.onDestroy))
      .subscribe((value: CampoEpaSustentable) => {
        if (value) {
        const esSojaYCampoSustentable =  producto.value.id === Productos.Soja && sustentable && sustentable.value;
            if (producto.value.id === Productos.SojaEPA || esSojaYCampoSustentable) {
              this.formComponentService.setValue('sustentable', value.esSustentable, {onlySelf: true, emitEvent: false});
              this.formComponentService.setValue('procedencia', value.ciudad, { onlySelf: true, emitEvent: false });
              this.formComponentService.setValue('cosecha', value.cosecha, { onlySelf: true, emitEvent: false });
          } else {
            campoEpa.reset();
          } }
      });
    }
  }

  private limpiarCalculosAnteriores(): void {
    const grado = this.form.get('rubros.grado');
    const factor = this.form.get('rubros.factor');
    const campoEpa = this.form.get('campoEpa');
    if (grado && factor && campoEpa) {
      grado.reset();
      factor.reset();
      campoEpa.reset();
    }
  }

  private suscribirseCambioProducto() {
    const productoCtrl = this.form.controls.producto;
    productoCtrl.valueChanges
      .pipe(distinctUntilChanged(), takeUntil(this.onDestroy))
      .subscribe((nuevoProductoSeleccionado: Producto) => {
        if (!nuevoProductoSeleccionado) {
          return;
        }

        const cosechaCtl = this.formComponentService.getControl('cosecha');
        if (cosechaCtl) {
          cosechaCtl.clearValidators();
          if (this.idTipoProducto === TiposProducto.Cereal ||
              this.idTipoProducto === TiposProducto.NoGranos) {
            cosechaCtl.setValidators(Validators.required);
          }
          cosechaCtl.updateValueAndValidity();
        }

        if (this.producto.id !== nuevoProductoSeleccionado.id) {
          this.producto = nuevoProductoSeleccionado;
          this.movimiento.producto = nuevoProductoSeleccionado;
          this.limpiarCalculosAnteriores();
          this.formComponentService.setValue('silo', undefined, { onlySelf: true });
        }

        if (this.esDescarga && (this.idTipoProducto === TiposProducto.Cereal || this.idTipoProducto === TiposProducto.NoGranos)) {
          this.hideCampoEpa = false;
          this.hideCalidad = false;

          this.esProductoSeleccionadoElProductoOriginal = nuevoProductoSeleccionado.id === this.idProductoOriginal;
          const esGrupoSoja =  nuevoProductoSeleccionado.idGrupo ===  GrupoProducto.Soja;
          this.completeRubros(nuevoProductoSeleccionado.id, this.esProductoSeleccionadoElProductoOriginal, esGrupoSoja);

          this.fillCosecha = true;

          if (nuevoProductoSeleccionado.id === Productos.SojaEPA) {
            this.fillCosecha = false;
            this.activarCampoEpa(true, true);
            this.activarSustentabilidad(false);
          } else if (nuevoProductoSeleccionado.id === Productos.Soja) {
            this.activarSustentabilidad(true, true);
          } else {
            this.activarCampoEpa(false);
            this.activarSustentabilidad(false);
          }
        } else {
          this.hideCampoEpa = true;
          this.hideCalidad = true;
          this.activarCampoEpa(false, true);
          this.activarSustentabilidad(false);
        }

        if (nuevoProductoSeleccionado.id !== this.idProductoOriginal) {
          this.formComponentService.enableControl('rubros.rubrosCalidad');
        }
      });
  }

  private activarCampoEpa(activar: boolean, esSojaEpa = false) {
    this.fillCampoEpa = activar;
    if (activar) {
      this.form.controls.campoEpa.enable();
      this.form.controls.campoEpa.setValidators(Validators.required);
      this.form.controls.campoEpa.updateValueAndValidity();
    } else {
      this.form.controls.campoEpa.disable();
      this.form.controls.campoEpa.clearValidators();
      this.form.controls.campoEpa.updateValueAndValidity();
    }

    if (esSojaEpa) {
      this.form.controls.cosecha.disable();
      this.form.controls.procedencia.disable();
      this.form.controls.procedencia.clearValidators();
      this.form.controls.procedencia.updateValueAndValidity();
    } else {
      this.form.controls.cosecha.enable();
      this.form.controls.procedencia.enable();
      this.form.controls.procedencia.setValidators(Validators.required);
      this.form.controls.procedencia.updateValueAndValidity();
    }
  }

  private activarSustentabilidad(activar: boolean, esSoja = false) {
    if (esSoja) {
      this.formComponentService.setValue('sustentable', false, {onlySelf: true});
    }
    if (activar) {
      this.form.controls.sustentable.enable();
    } else {
      this.form.controls.sustentable.disable();
    }
  }

  private suscribirseCambioSustentabilidad() {
    const sustentableCtrl = this.form.controls.sustentable;
    sustentableCtrl.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe((value: boolean) => {
        const idProducto = this.formComponentService.getValue('producto');
        if (idProducto === Productos.Soja) {
          value ? this.activarCampoEpa(true) : this.activarCampoEpa(false);
        }
      });
  }

  private loadMovimiento(movimiento: MovimientoCerealGrano) {
    const tipoMovimiento = tiposMovimientos.find(t => t.id === movimiento.circuito.idTipoMovimiento);
    const tipoTransporte = tiposTransportes.find(t => t.id === movimiento.circuito.idTipoTransporte);
    this.idMovimiento = movimiento.id;
    this.idProductoOriginal = movimiento.producto.id;
    this.producto = movimiento.producto;
    this.titular = movimiento.titular;
    if (tipoMovimiento && tipoTransporte) {
      this.formComponentService.setValue('circuito.tipoMovimiento', tipoMovimiento.descripcion, {onlySelf: true});
      this.formComponentService.setValue('circuito.tipoTransporte', tipoTransporte.descripcion, {onlySelf: true});
    }
    this.formComponentService.setValue('circuito.tipoProducto', movimiento.tipoProducto.descripcion, {onlySelf: true});
    this.formComponentService.setValue('producto', movimiento.producto, {onlySelf: true});
    if (movimiento.campoEpaSustentable) {
      this.formComponentService.setValue('sustentable', movimiento.campoEpaSustentable.esSustentable, {onlySelf: true});
      this.formComponentService.setValue('campoEpa', movimiento.campoEpaSustentable, {onlySelf: true});
    }
    this.datosMovimiento.loadMovimiento(movimiento);
    const fecha = movimiento.fechaStockSan ? new Date(movimiento.fechaStockSan).toLocalISOString().substring(0, 10) : null;
    this.formComponentService.setValue('fechaPeriodoStockSan.fechaStock', fecha, {onlySelf: true});
    this.formComponentService.setValue('netoBalanza', movimiento.kgNeto, {onlySelf: true});
    this.formComponentService.setValue('procedencia', movimiento.procedencia, {onlySelf: true});

    this.formComponentService.setValue('cosecha', movimiento.cosecha, {onlySelf: true});
    this.formComponentService.setValue('silo', movimiento.silo, {onlySelf: true});
  }

  private mapToCommand(): ModificarProductoFueraCircuitoCommand {
    const command = new ModificarProductoFueraCircuitoCommand(this.idMovimiento, this.idTipoProducto);
    command.fechaStockSan = this.formComponentService.getValue('fechaPeriodoStockSan.fechaStock');
    command.idProducto = this.formComponentService.getValue('producto');
    command.idCampoEpaSustentable = this.formComponentService.getValue('campoEpa');
    command.idCosecha = this.formComponentService.getValue('cosecha');
    command.idProcedencia = this.formComponentService.getValue('procedencia');
    command.esSustentable = this.formComponentService.getValue('sustentable');
    command.idSilo = this.formComponentService.getValue('silo');

    command.rubrosCalidad = (this.rubrosCalidad.getRawValue() as RubroCalidadMovimientoCereal[]).filter(rubro => rubro.valorMedido > 0);

    command.factor = this.formComponentService.getValue('rubros.factor');
    command.idGrado = this.formComponentService.getValue('rubros.grado');

    return command;
  }

  private registrarModificacion(self: ModificarProductoFueraCircuitoComponent) {
    const command = self.mapToCommand();
    self.modificarProductoFueraCircuitoService.modificarProducto(command).pipe(takeUntil(this.onDestroy))
    .subscribe(() => {
      self.popupService.success('Se registró la modificación del producto.', 'Aceptar');
      setTimeout(() => {
        self.navigationService.navigate(self.ControlPath, self.GestionarMovimientosPath);
      }, 1500);
    });
  }

  realizaCalculoCalidad(): boolean {
    return (this.idTipoProducto === TiposProducto.Cereal || this.idTipoProducto === TiposProducto.NoGranos)
      && !this.esProductoSeleccionadoElProductoOriginal;
  }

  aceptar() {
    const fechaStock = this.form.get('fechaPeriodoStockSan.fechaStock');
    if (fechaStock) {
      fechaStock.updateValueAndValidity();
    }
    if (this.formComponentService.isValidForm()) {
      if (this.realizaCalculoCalidad()) {
        this.rubrosCalidadComponent.calcularCalidad(this.registrarModificacion, this);
      } else {
        this.registrarModificacion(this);
      }
    } else {
      const errors = new Collection<string>();
      this.formComponentService.validateForm(this.form.controls, errors, '');
      this.formComponentService.showValidationError(errors);
   }
  }

  cancelar() {
    this.popupService.warning('Se canceló la modificación del producto.', 'Cancelar');
    setTimeout(() => {
      this.navigationService.navigate(this.ControlPath, this.GestionarMovimientosPath);
    }, 1500);
  }
}
