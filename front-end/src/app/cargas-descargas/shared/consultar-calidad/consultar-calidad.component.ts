import { Component, OnInit, ViewChild, OnDestroy, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { IngresoCalidad } from '../../../shared/data-models/ingreso-calidad/ingreso-calidad';
import { CalidadMovimientoCerealService } from '../../shared/services/calidad-movimiento-cereal.service';
import { RubroCalidadMovimientoCereal } from '../../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';
import { DescargaEventsNotifierService } from '../../shared/services/descarga-events-notifier.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RubrosCalidadComponent } from '../../ingresar-calidad-calado/rubros-calidad/rubros-calidad.component';
import { Producto } from '../../../shared/data-models/producto';
import { AuthService } from '../../../core/services/session/auth.service';
import { DatosLaboratorioComponent } from '../datos-laboratorio/datos-laboratorio.component';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { ResultadoCalculoCalidad } from '../../../shared/data-models/calculo-calidad/resultado-calculo-calidad';
import { ResultadoMedicionDeRubro } from '../../../shared/data-models/calculo-calidad/resultado-medicion-rubro';
import { MermasEspecialesComponent } from '../../ingresar-calidad-calado/mermas-especiales/mermas-especiales.component';
import { CondicionMermaEspecialDataView } from '../../../shared/data-models/ingreso-calidad/condicion-merma-especial-data-view';
import { Operaciones } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-consultar-calidad',
  templateUrl: './consultar-calidad.component.html',
  styleUrls: ['./consultar-calidad.component.css'],
  providers: [FormComponentService]
})
export class ConsultarCalidadComponent implements OnInit, OnDestroy {

  @ViewChild('rubrosCalidadComponent') rubrosCalidadComponent: RubrosCalidadComponent;
  @ViewChild('datosLaboratorioComponent') datosLaboratorioComponent: DatosLaboratorioComponent;
  @ViewChild('mermasEspecialesComponent') mermasEspecialesComponent: MermasEspecialesComponent;
  @Input() traeCalidadAnterior?: boolean;
  @Input() esCarga?: boolean;

  operacion = Operaciones.Consulta;
  consultarCalidadForm: FormGroup;
  idMovimiento: number;
  private readonly onDestroy = new Subject();
  producto: Producto;
  rubrosSelected: any[];
  mostrarMermasEspeciales = false;
  nroDocumentoPorte = '';
  ctg = 0;
  usaMuestraTipoAcopio: boolean;
  esAcopio = false;

  get rubrosCalidad(): FormArray {
    return this.consultarCalidadForm.get('rubros.rubrosCalidad') as FormArray;
  }

  get mermasEspeciales(): FormArray {
    return this.consultarCalidadForm.get('mermasEspeciales') as FormArray;
  }

  constructor(private readonly fb: FormBuilder,
              private readonly formComponentService: FormComponentService,
              private readonly calidadMovimientoCerealService: CalidadMovimientoCerealService,
              private readonly eventsNotifierService: DescargaEventsNotifierService,
              private readonly authService: AuthService) {
              const userContext = this.authService.getUserContext();
              if (userContext) {
                this.usaMuestraTipoAcopio = userContext.terminal.usaMuestraTipoAcopio;
              }
            }

  ngOnInit() {
    this.createForm();
    this.formComponentService.initialize(this.consultarCalidadForm);
    this.subscribeFormInteraction();
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  private subscribeFormInteraction() {
    this.eventsNotifierService.movimientoRetrieved
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((movimiento: Movimiento) => {
        this.producto = movimiento.producto;
        this.nroDocumentoPorte = movimiento.nroDocumentoPorte;
        this.ctg = movimiento.numeroCTG ? movimiento.numeroCTG : 0;
        this.esCarga = (movimiento.circuito.idTipoMovimiento === 1);
        setTimeout(() => {
          this.loadMovimiento(movimiento.id);
        }, 0);
      });

      this.eventsNotifierService.movimientoCaladoRetrieved
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe((movimiento: MovimientoCalado) => {
        this.producto = movimiento.producto;
        this.nroDocumentoPorte = movimiento.numeroDocumentoPorte;
        this.ctg = movimiento.ctg;
        this.esCarga = (movimiento.idTipoMovimiento === 1);
        setTimeout(() => {
          this.loadMovimiento(movimiento.id);
        }, 0);
      });
  }

  private loadMovimiento(idMovimiento: number) {
    if (this.traeCalidadAnterior) {
      this.calidadMovimientoCerealService.getCalidadAnterior(idMovimiento)
        .subscribe((calidad: IngresoCalidad) => {
          this.completarDatos(calidad);
        });
    } else {
      this.calidadMovimientoCerealService.getCalidadVigente(idMovimiento)
        .subscribe((calidad: IngresoCalidad) => {
          this.completarDatos(calidad);
        });
    }
  }

  abrir(idMovimiento: number, producto: Producto, numeroDocumentoPorte: any, esCarga: boolean) {
    this.idMovimiento = idMovimiento;
    this.producto = producto;
    this.nroDocumentoPorte = numeroDocumentoPorte;
    this.esCarga = esCarga;
    this.loadMovimiento(idMovimiento);
  }

  private createForm() {
    this.consultarCalidadForm = this.fb.group({
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
      observaciones: this.fb.group({
        referenciaDestino: { value: null, disabled: true },
        observacionLDC: { value: null, disabled: true },
        observacionEntregador: { value: null, disabled: true }
      }),
      datosCamara: this.fb.group({
        tecnologia: { value: false, disabled: true },
        camara: { value: false, disabled: true },
        fechaEnvio: { value: null, disabled: true },
        codigoBarra: { value: '', disabled: true },
        grupoRubroAnalisis: { value: '', disabled: true },
        laboratorio: { value: '', disabled: true }
      })
    });
    this.eventsNotifierService.onChildFormIntanceReady(this.consultarCalidadForm, 'consultarCalidadForm');
  }

  private selectRubrosMarcadosParaAnalisis() {
    const rubrosSeleccionados = this.rubrosCalidad.controls.filter(rc => rc.value.requiereAnalisis === true);
    this.rubrosSelected = [...rubrosSeleccionados];
  }

  private completarDatos(datos: IngresoCalidad) {
    if (datos) {

      this.addRangeRubroCalidad(datos.rubros);
      this.addRangeMermasEspeciales(datos.condicionMermasEspeciales);
      this.asignarValoresAComponenteRubrosDeCalidad(datos);

      this.consultarCalidadForm.controls.datosCamara.patchValue({
        camara: datos.requiereAnalisisCamara,
        tecnologia: datos.requiereAnalisisPorTecnologia,
        grupoRubroAnalisis: datos.requiereAnalisisCamara ? datos.grupoRubroCalidadAnalisis : null,
        codigoBarra: datos.requiereAnalisisPorTecnologia || datos.requiereAnalisisCamara
          ? datos.codigoBarras : null,
        fechaEnvio: datos.requiereAnalisisPorTecnologia || datos.requiereAnalisisCamara
          ? datos.fechaEnvioACamara : null,
        laboratorio: datos.requiereAnalisisCamara ? datos.laboratorio : null
      });

      if (datos.requiereAnalisisPorTecnologia || datos.requiereAnalisisCamara) {
        this.selectRubrosMarcadosParaAnalisis();
      }

      this.consultarCalidadForm.controls.observaciones.patchValue({
        referenciaDestino: datos.referenciaDestino,
        observacionLDC: datos.observacionLDC,
        observacionEntregador: datos.observacionEntregador
      });

      this.datosLaboratorioComponent.setDatosLaboratorio(datos.muestrasLaboratorio,
        datos.decisionLaboratorio,
        datos.observacionesLaboratorio);

      this.consultarCalidadForm.controls.rubros.disable();
      this.consultarCalidadForm.controls.datosCamara.disable();
    }
  }

  private asignarValoresAComponenteRubrosDeCalidad(datos: IngresoCalidad): void {
    const datosDelResultadoDeCalidad = new ResultadoCalculoCalidad();
    datosDelResultadoDeCalidad.factor = datos.factor;

    if (datos.grado != null) {
      datosDelResultadoDeCalidad.grado = datos.grado;
    }

    datos.rubros.forEach(rubro => {
      const resultadoMedicionDeRubro = new ResultadoMedicionDeRubro();

      resultadoMedicionDeRubro.valorMedido = rubro.valorMedido;
      resultadoMedicionDeRubro.idRubroCalidad = rubro.idRubroCalidad;
      resultadoMedicionDeRubro.porcentajeBonificacion = rubro.porcentajeBonificacion;
      resultadoMedicionDeRubro.porcentajeRebajaConvenida = rubro.porcentajeRebajaConvenida;
      resultadoMedicionDeRubro.porcentajeMerma = rubro.porcentajeMerma;
      resultadoMedicionDeRubro.porcentajeRebaja = rubro.porcentajeRebaja;
      resultadoMedicionDeRubro.kgPesoMerma = rubro.kgPesoMerma;

      if (rubro.servicioAcondicionamiento != null) {
        resultadoMedicionDeRubro.servicioAcondicionamiento = rubro.servicioAcondicionamiento;
      }

      datosDelResultadoDeCalidad.resultadosRubrosCalidad.push(resultadoMedicionDeRubro);
    });

    this.rubrosCalidadComponent.setRubrosRows(this.rubrosCalidad);
    this.rubrosCalidadComponent.setearRubros(datosDelResultadoDeCalidad);
    setTimeout(() => {
      this.mermasEspecialesComponent.setRows(this.mermasEspeciales);
    }, 0);

    if (datos.condicionMermasEspeciales.length > 0) {
      this.mostrarMermasEspeciales = true;
    } else {
      this.mostrarMermasEspeciales = false;
    }
  }

  reinicializar() {
    this.formComponentService.resetForm();
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
      requiereAnalisis: rubro.requiereAnalisis,
      descripcion: rubro.descripcion,
      porcentajeBonificacion: '',
      porcentajeRebajaConvenida: '',
      porcentajeMerma: '',
      valorMedido: '',
      servicioAcondicionamiento: '',
      lecturaAutomatica: rubro.lecturaAutomatica,
      lecturaAutomaticaDescripcion: rubro.lecturaAutomaticaDescripcion,
      esRequerido: rubro.esRequerido,
      determinaGrado: rubro.determinaGrado,
      porcentajeRebaja: '',
      idRubroCalidad: rubro.idRubroCalidad,
      kgPesoMerma: ''
    });

    return rubroCalidadFormGroup;
  }

  private clearRubrosCalidadArray() {
    while (this.rubrosCalidad.length !== 0) {
      this.rubrosCalidad.removeAt(0);
    }
  }

  private addRangeMermasEspeciales(mermasEspeciales: CondicionMermaEspecialDataView[]): void {
    this.clearMermasEspecialesArray();
    mermasEspeciales.forEach(me => {
      this.mermasEspeciales.push(this.buildMermaEspecial(me));
    });
  }

  private buildMermaEspecial(mermaEspecial: CondicionMermaEspecialDataView): FormGroup {
    return this.fb.group({
      id: mermaEspecial.id,
      descripcion: mermaEspecial.descripcion,
      porcentajeMerma: mermaEspecial.porcentajeMerma,
      afectaStock: mermaEspecial.afectaStock,
      aftectaAplicacion: mermaEspecial.afectaAplicacion,
      recuperaMerma: mermaEspecial.recuperaMerma
    });
  }

  private clearMermasEspecialesArray() {
    while (this.mermasEspeciales.length !== 0) {
      this.mermasEspeciales.removeAt(0);
    }
  }
}
