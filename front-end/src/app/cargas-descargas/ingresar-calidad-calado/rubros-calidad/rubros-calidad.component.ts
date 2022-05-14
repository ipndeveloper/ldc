import { Component, Input, OnChanges, OnInit, TemplateRef, ViewChild, SimpleChanges, Output, EventEmitter, ElementRef, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, AbstractControl } from '@angular/forms';
import { IngresarCalidadCaladoService } from '../ingresar-calidad-calado.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Collection } from '../../../core/models/collection';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { Operaciones, TiposMovimiento } from '../../../shared/enums/enums';
import { CalculoCalidad } from '../../../shared/data-models/calculo-calidad/calculo-calidad';
import { MedicionDeRubro } from '../../../shared/data-models/calculo-calidad/medicion-rubro';
import { ResultadoCalculoCalidad } from '../../../shared/data-models/calculo-calidad/resultado-calculo-calidad';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { PositiveDecimalSeparatorPipe } from '../../../core/pipes/positive-decimal-separator.pipe';
import { ModalIngresarRebajaConvenidaComponent } from './modal-ingresar-rebaja-convenida/modal-ingresar-rebaja-convenida.component';
import { createNumberMask } from 'text-mask-addons';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'yrd-rubros-calidad',
  templateUrl: './rubros-calidad.component.html',
  styleUrls: ['./rubros-calidad.component.css']
})

export class RubrosCalidadComponent implements OnInit, OnChanges, OnDestroy {

  @Input() movimiento: MovimientoCalado;
  @Input() rubrosForm: FormGroup;
  @Input() rubrosCalidad: FormArray;
  @Input() deshabilitarCalculoCalidad: boolean;
  @Input() idTerminal: number;
  @Input() disableSelectRubro = true;
  @Input() selectedRows = [];
  @Input() operacion: number;
  @Input() lecturaAutomatica = false;
  @Input() esConsulta = false;
  @Input() disableButtons = false;
  @Input() rubrosPorTipoAnalisis: any[] = [];
  @Input() esCarga = false;
  @Input() esAcopio = false;
  @Output() leerDispositivoClicked = new EventEmitter();
  @ViewChild('valorRubroTemplate') valorRubroTemplate: TemplateRef<any>;
  @ViewChildren('inputRow') inputRows: QueryList<ElementRef>;
  @ViewChild('selectRubroHeaderTemplate') selectRubroHeaderTemplate: TemplateRef<any>;
  @ViewChild('selectRubroCellTemplate') selectRubroCellTemplate: TemplateRef<any>;
  @ViewChild('modalRebajaConvenida') modalRebajaConvenida: ModalIngresarRebajaConvenidaComponent;
  columns: any;
  rows: any;
  realizoCalculoCalidad: boolean;
  lecturaDispositivoRealizada: boolean;
  mask: any;
  private onDestroy = new Subject();
  constructor(private readonly ingresarCalidadService: IngresarCalidadCaladoService,
    private readonly formComponentService: FormComponentService,
    private readonly popupService: PopupService,
    private readonly positiveDecimalSeparatorPipe: PositiveDecimalSeparatorPipe) {
    this.mask = createNumberMask({
      prefix: '',
      includeThousandsSeparator: false,
      allowDecimal: true
    });
  }

  ngOnInit(): void {
    this.columns = [
      {
        name: '',
        headerTemplate: this.selectRubroHeaderTemplate,
        cellTemplate: this.selectRubroCellTemplate,
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizeable: false,
        width: 30
      },
      {
        resizeable: false,
        name: 'Rubro',
        prop: 'value.descripcion'
      },
      {
        resizeable: false,
        name: 'Valor',
        cellTemplate: this.valorRubroTemplate,
        prop: 'value.valorMedido'
      },
      {
        resizeable: false,
        name: 'Merma',
        prop: 'value.porcentajeMerma'
      },
      {
        resizeable: false,
        name: 'Rebaja',
        prop: 'value.porcentajeRebaja',
        pipe: this.positiveDecimalSeparatorPipe
      },
      {
        resizeable: false,
        name: 'Rebaja Convenida',
        prop: 'value.porcentajeRebajaConvenida',
        pipe: this.positiveDecimalSeparatorPipe
      },
      {
        resizeable: false,
        name: 'Bonificación',
        prop: 'value.porcentajeBonificacion'
      },
      {
        resizeable: false,
        name: 'Acondicionamiento',
        prop: 'value.servicioAcondicionamiento.descripcion'
      }
    ];

    if (this.esConsulta) {
      this.columns = (this.columns as [any]).concat([{
        resizeable: false,
        name: 'M/A',
        prop: 'value.lecturaAutomaticaDescripcion'
      }]);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.selectedRows) {
      this.selectRubros(changes.selectedRows.currentValue);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.onDestroy.complete();
  }

  leerDispositivo(): void {
    this.leerDispositivoClicked.emit();
  }

  calcularCalidad(calcularCalidadCallBack: ((any) => void) | null = null, self: any = null): void {
    this.mensajeFaltaParametrizarMermaEspecial();
    if (!this.rubrosForm.valid) {
      const errors = new Collection<string>();
      this.formComponentService.validateForm(this.rubrosForm.controls, errors, 'rubros');
      this.formComponentService.showValidationError(errors);
      return;
    }

    if (this.lecturaAutomatica && !this.lecturaDispositivoRealizada) {
        this.popupService.error(Resources.Messages.DebeLeerElDispositivoAntesDeCalcularLaCalidad);
    } else {

      this.limpiarCalculosAnteriores();

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

      this.ingresarCalidadService.CalcularCalidad(calidad)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(datos => {
        datos.alertas.forEach(alerta => {
          this.popupService.warning(alerta);
        });

        this.setearRubros(datos);
        this.realizoCalculoCalidad = true;

        if (calcularCalidadCallBack) {
          calcularCalidadCallBack(self);
        }
      });
    }
  }

  private limpiarCalculosAnteriores(): void {
    this.rubrosCalidad.controls.forEach(row => {
      this.limpiarRow(row);
    });
    this.setRubrosRows(this.rubrosCalidad);
  }

  private limpiarRow(row: AbstractControl) {
    row.patchValue({ porcentajeBonificacion: '' });
    row.patchValue({ porcentajeMerma: '' });
    row.patchValue({ porcentajeRebaja: '' });
    row.patchValue({ servicioAcondicionamiento: '' });
    if (!(row as FormGroup).getRawValue().valorMedido) {
      row.patchValue({ porcentajeRebajaConvenida: '' });
    }
  }

  public setearRubros(datos: ResultadoCalculoCalidad) {
    this.asignarValoresDeCalculoDeCalidadParaConsulta(datos);

    if (datos.grado) {
      this.rubrosForm.patchValue({ grado: datos.grado });
    } else {
      this.rubrosForm.controls.grado.setValue({ id: '' , descripcion: '' });
    }

    this.rubrosForm.patchValue({ factor: datos.factor });

    this.setRubrosRows(this.rubrosCalidad);
  }

  private asignarValoresDeCalculoDeCalidadParaConsulta(datos: ResultadoCalculoCalidad): void {
    datos.resultadosRubrosCalidad.forEach(resultadoRubro => {
      const rubroCalidad = this.rows.find(rc => rc.value.idRubroCalidad === resultadoRubro.idRubroCalidad);
      const porcentajeRebajaConvenida = rubroCalidad.value.porcentajeRebajaConvenida || resultadoRubro.porcentajeRebajaConvenida;

      if (rubroCalidad) {
        rubroCalidad.patchValue({
          requiereAnalisis: rubroCalidad.value.requiereAnalisis,
          valorMedido: resultadoRubro.valorMedido,
          porcentajeBonificacion : resultadoRubro.porcentajeBonificacion,
          porcentajeMerma : !this.esCarga ? resultadoRubro.porcentajeMerma : '',
          porcentajeRebaja : resultadoRubro.porcentajeRebaja,
          servicioAcondicionamiento : resultadoRubro.servicioAcondicionamiento,
          porcentajeRebajaConvenida:  porcentajeRebajaConvenida != null ? porcentajeRebajaConvenida : 0,
          kgPesoMerma : resultadoRubro.kgPesoMerma
        });
      }
    });
  }

  ingresarRebajaConvenida() {
    if (this.puedeIngresarRebajaConvenida()) {
      this.modalRebajaConvenida.open();
    } else {
      this.popupService.error(Resources.Messages.DebeCalcularParaPoderIngresarRebajaConvenida,
        Resources.Labels.RebajaConvenida);
    }
  }

  setRubrosRows(rubrosCalidad: FormArray) {
    this.rows = [...rubrosCalidad.controls];
  }

  setFocus() {
    setTimeout(() => {
      if (this.inputRows) {
        const elem = this.inputRows.find((input) => !input.nativeElement.disabled);
        if (elem) {
          elem.nativeElement.focus();
        }
      }
    }, 0);
  }

  onSelect(rows) {
    if (rows.selected && !this.disableSelectRubro) {
      this.selectRubros(rows.selected);
    }
  }

  deshabilitarRubrosAutomaticos(rubrosCalidad: EntityWithDescription[]) {
    this.lecturaDispositivoRealizada = false;
    if (rubrosCalidad.length !== 0) {
      this.rows.forEach((elem) => {
        const rc = rubrosCalidad.find(r => r.id === elem.controls.idRubroCalidad.value);
        if (rc) {
          elem.controls.lecturaAutomatica.patchValue(true);
          elem.controls.valorMedido.disable();
        }
      });
    }
  }

  onAcceptRebajaConvenida(rubroModificado: FormGroup) {
    const rubro = this.rubrosCalidad.controls.find((r: FormGroup) => {
      return r.controls.id.value === rubroModificado.controls.id.value;
    }) as FormGroup;

    if (rubro) {
      rubro.controls.porcentajeRebajaConvenida.setValue(rubroModificado.controls.porcentajeRebajaConvenida.value);
      this.setRubrosRows(this.rubrosCalidad);
    }
  }

  valorRubroChanged(rubroRow: FormGroup) {
    if (!rubroRow.controls.valorMedido.value) {
      this.limpiarRow(rubroRow);
      this.setRubrosRows(this.rubrosCalidad);
    }
  }

  private selectRubros(rubrosSeleccionados: any[] | undefined) {
    if (rubrosSeleccionados) {
      this.rubrosCalidad.controls.forEach(r => {
        const rubro = rubrosSeleccionados.find(rc => rc.value.id === r.value.id);
        const rubroControl = r as FormGroup;
        if (rubro) {
          rubroControl.controls.requiereAnalisis.setValue(true);
        } else {
          rubroControl.controls.requiereAnalisis.setValue(false);
        }
      });
    } else {
      this.rubrosCalidad.controls.forEach(r => {
        const rubroControl = r as FormGroup;
        rubroControl.controls.requiereAnalisis.setValue(false);
      });
    }
  }

  private puedeIngresarRebajaConvenida(): boolean {
    return this.rubrosCalidad && this.rubrosCalidad.length > 0 &&
    (this.realizoCalculoCalidad || this.operacion === Operaciones.Modificacion);
  }

  mensajeFaltaParametrizarMermaEspecial(): void {
    if ((this.operacion === Operaciones.Alta || this.operacion === Operaciones.Modificacion ) &&
        this.esAcopio &&
        !this.movimiento.tieneNotificacionMermasEspecialesParametrizadas &&
        this.movimiento.idTipoMovimiento === TiposMovimiento.Descarga) {
      this.popupService.warning(Resources.Messages.NoSeEncuentraConfiguradaNotificacionPorFaltaDeParametrizacionMermasEspeciales);
    }
  }
}
