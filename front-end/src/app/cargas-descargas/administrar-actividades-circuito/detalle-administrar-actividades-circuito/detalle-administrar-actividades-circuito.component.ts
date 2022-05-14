import { Component, OnInit, Input, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { Subject } from 'rxjs';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { ActividadService } from './actividad.service';
import { ResultadoActividadCircuitoDataView } from '../../../shared/data-models/actividad-circuito-data-view';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-actividades-circuito',
  templateUrl: './detalle-administrar-actividades-circuito.component.html',
  styleUrls: ['./detalle-administrar-actividades-circuito.component.css']
})
export class DetalleAdministrarActividadesCircuitoComponent implements OnInit, OnDestroy {
  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('circuito') circuito: DesplegableCircuitoComponent;
  @ViewChild('habilitadoResultadoTemplate') habilitadoResultadoTemplate: TemplateRef<any>;
  @ViewChild('estadoFinalResultadoTemplate') estadoFinalResultadoTemplate: TemplateRef<any>;

  columns: any;
  rows: any;
  Permission = Permission;
  validationMessagesCircuito = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Circuito)
  };
  validationMessagesEstadoInicial = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.EstadoInicial)
  };
  validationMessagesActividad = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Actividad)
  };

  private readonly onDestroy = new Subject();

  get resultadosFormArray(): FormArray {
    return this.form.controls.resultados as FormArray;
  }

  constructor(private readonly actividadService: ActividadService,
              private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.setGridColumns();
    this.subscribeActividad();
  }

  private setGridColumns() {
    this.columns = [
      {
        sortable: false,
        dragable: false,
        resizeable: false,
        name: 'Resultado',
        prop: 'value.resultado.descripcion'
      },
      {
        sortable: false,
        dragable: false,
        resizeable: false,
        name: 'Habilitado',
        prop: 'value.habilitado',
        cellTemplate: this.habilitadoResultadoTemplate,
        width: -100
      },
      {
        sortable: false,
        dragable: false,
        resizeable: false,
        name: 'Estado Final',
        prop: 'value.estadoFinal.descripcion',
        cellTemplate: this.estadoFinalResultadoTemplate,
        width: 200
      },
    ];
  }

  private subscribeActividad() {
    this.form.controls.actividad.valueChanges
      .pipe(distinctUntilChanged(),
            takeUntil(this.onDestroy))
      .subscribe((actividad: EntityWithDescription) => {
        if (!this.isLoading) {
          if (actividad) {
            this.actividadService.getAllByActividad(actividad.id)
              .subscribe((resultadosActividad: EntityWithDescription[]) => {
                this.limpiarResultadosFormArray();
                resultadosActividad.forEach((resultadoActividad: EntityWithDescription) => {
                  this.resultadosFormArray.push(this.fb.group({
                    id: null,
                    resultado: resultadoActividad,
                    habilitado: false,
                    estadoFinal: {}
                  }));
                });
                this.rows = [...this.resultadosFormArray.controls];
              });
          } else {
            this.limpiarResultadosFormArray();
            this.rows = [...this.resultadosFormArray.controls];
          }
        }
      });
  }

  private limpiarResultadosFormArray() {
    while (this.resultadosFormArray.length !== 0) {
      this.resultadosFormArray.removeAt(0);
    }
  }

  setearResultados(resultados: ResultadoActividadCircuitoDataView[], isView: boolean): void {
    this.limpiarResultadosFormArray();
    resultados.forEach((resultado: ResultadoActividadCircuitoDataView) => {
      this.resultadosFormArray.push(this.fb.group({
        id: resultado.id,
        resultado: resultado.resultado,
        habilitado: {value: resultado.habilitado, disabled: isView},
        estadoFinal: {value: resultado.estadoFinal, disabled: isView}
      }));
    });
    this.rows = [...this.resultadosFormArray.controls];
  }

  setFocus() {
    setTimeout(() => {
      this.circuito.setFocus();
    }, 0);
  }

  ngOnDestroy() {
    this.onDestroy.next();
    this.onDestroy.unsubscribe();
  }

}
