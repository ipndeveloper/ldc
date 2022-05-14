import {
  Component, Input, OnChanges,
  OnDestroy, OnInit, SimpleChanges,
  TemplateRef, ViewChild
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { BalanzaAutomatizadaLog } from '../../../shared/data-models/balanza-automatizada-log';
import { Resources } from '../../../../locale/artifacts/resources';
import { faExclamationTriangle, faUserAlt, faUserCheck } from '@fortawesome/free-solid-svg-icons';
import { DataGridComponent } from '../../../core/controls/data-grid/data-grid.component';
import { DashboardService } from '../../shared/services/dashboard.service';
import { BalanzaDashboard } from '../../../shared/data-models/balanza-dashboard';
import { ReplaySubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ModalAutorizacionComponent } from '../../shared/modals/modal-autorizacion/modal-autorizacion.component';
import { ModalResolverEventoplataformaRequeridaComponent } from './modal-resolver-evento-plataforma-requerida/modal-resolver-evento-plataforma-requerida.component';
import { ModalResolverEventoTarjetaMatriculaComponent } from './modal-resolver-evento-tarjeta-matricula/modal-resolver-evento-tarjeta-matricula.component';
import { ModalSeleccionarBalanzaSalidaComponent } from './modal-seleccionar-balanza-salida/modal-seleccionar-balanza-salida.component';
import { ModalResolverEventoAutorizacionesComponent } from './modal-resolver-evento-autorizaciones/modal-resolver-evento-autorizaciones.component';
import { ModalResolverPlataformaDescargaComponent } from './modal-resolver-plataforma-descarga/modal-resolver-plataforma-descarga.component';
import { ParametrosAccion } from '../../../shared/data-models/parametros-accion';

@Component({
  selector: 'yrd-detalle-balanza',
  templateUrl: './detalle-balanza.component.html',
  styleUrls: ['./detalle-balanza.component.css']
})
export class DetalleBalanzaComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('modalAutorizacion') modalAutorizacion: ModalAutorizacionComponent;
  @ViewChild('modalResolverPlataformaRequerida') ModalResolverPlataformaRequerida: ModalResolverEventoplataformaRequeridaComponent;
  @ViewChild('modalResolverTarjetaMatricula') ModalResolverTarjetaMatricula: ModalResolverEventoTarjetaMatriculaComponent;
  @ViewChild('modalSeleccionarBalanzaSalida') ModalSeleccionarBalanzaSalida: ModalSeleccionarBalanzaSalidaComponent;
  @ViewChild('modalResolverAutorizaciones') ModalResolverAutorizaciones: ModalResolverEventoAutorizacionesComponent;
  @ViewChild('modalResolverPlataformaDescarga') ModalResolverPlataformaDescarga: ModalResolverPlataformaDescargaComponent;
  constructor(
    private dashboardService: DashboardService,
    private readonly fb: FormBuilder
    ) { }

  protected onDestroy: ReplaySubject<boolean> = new ReplaySubject(1);
  @Input() balanza: BalanzaDashboard;
  @Input() numeroBalanza: number;
  @Input() balanzaAutomatizadaLog: BalanzaAutomatizadaLog;
  @ViewChild('tableHeaderTemplate') tableHeaderTemplate: TemplateRef<any>;
  @ViewChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;
  @ViewChild('iconCellTemplate') iconCellTemplate: TemplateRef<any>;
  @ViewChild('dataGrid') dataGrid: DataGridComponent;
  form: FormGroup;
  columns: any;
  rows: any;
  faExclamationTriangle = faExclamationTriangle;
  faUserAlt = faUserAlt;
  faUserCheck = faUserCheck;
  selectedRows = [];
  get rolesFormArray(): FormArray {
    return this.form.controls.rolesAutorizar as FormArray;
  }

  get logForm() {
    return this.form.get('log') as FormArray;
  }

  ngOnInit() {
    this.form = this.fb.group({
      log: this.fb.array([])
    });
    this.dashboardService.obtenerLogBalanzaAutomatizada(this.balanza.id)
      .pipe(takeUntil(this.onDestroy))
      .subscribe(data => {
        this.setLog(data);
      });
    this.setGridColumns();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.balanzaAutomatizadaLog.currentValue !== changes.balanzaAutomatizadaLog.previousValue
      && this.balanza.id.toString() === changes.balanzaAutomatizadaLog.currentValue.idDispositivo) {
      this.AddItemToGrid(changes.balanzaAutomatizadaLog.currentValue);
    }
  }

  AddItemToGrid(item: BalanzaAutomatizadaLog) {
    const existingLog = this.getExistingItem(item);
    if (existingLog == null) {
      this.logForm.push(this.buildLog(item));
    } else {
      this.logForm.setControl(existingLog.indice, this.buildLog(existingLog));
    }
    this.refreshGrid();
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  onResolverAccion(row: any) {
    const parametrosAccion: ParametrosAccion = {
      idBitacora: parseInt(row.controls.id.value, 10),
      pathArchestra: row.controls.pathArchestra.value,
      idDispositivo: parseInt(row.controls.idDispositivo.value, 10)
     };
    switch (row.controls.accion.value) {
      case 'ResolverEventoTarjetaMatricula':
            this.ModalResolverTarjetaMatricula.open(parametrosAccion);
            break;
      case 'ResolverEventoAutorizaciones':
            this.ModalResolverAutorizaciones.open(parametrosAccion);
            break;
      case 'ResolverEventoPlataformaRequerida':
            this.ModalResolverPlataformaRequerida.open(parametrosAccion);
            break;
      case 'ResolverEventoPlataformaDescarga':
            this.ModalResolverPlataformaDescarga.open(parametrosAccion);
            break;
      case 'SeleccionarBalanzaSalida':
            this.ModalSeleccionarBalanzaSalida.open(parametrosAccion);
            break;
    }
  }

  private setLog(checklist: BalanzaAutomatizadaLog[]): void {
    this.clearLog();
    checklist.forEach(l => {
      this.logForm.push(this.buildLog(l));
    });
    this.refreshGrid();
  }

  private clearLog() {
    while (this.logForm.length !== 0) {
      this.logForm.removeAt(0);
    }
    this.refreshGrid();
  }

  private buildLog(value: BalanzaAutomatizadaLog): FormGroup {
    const checklistFormGroup = this.fb.group({
      aviso: { value: value.motivo, disabled: false },
      fecha: { value: value.fecha, disabled: false },
      gravedad: { value: value.gravedad, disabled: false },
      accion: { value: value.requiereAccion ? value.accion : 'n/a', disabled: false },
      requiereAccion: { value: value.requiereAccion, disabled: false },
      pathArchestra: { value: value.pathArchestra, disabled: false },
      id: { value: value.id, disabled: false },
      estadoEvento: { value: value.estadoEvento, disabled: false },
      idDispositivo: {value: value.idDispositivo, disabled: false }
    });
    return checklistFormGroup;
  }
  private refreshGrid() {
    // Ordena la grilla descendentemente
    this.logForm.controls.sort(function (a, b) {
      if (a.value.id > b.value.id) {
        return -1;
      } else if (a.value.id < b.value.id) {
        return 1;
      } else {
        return 0;
      }
    });

    // Quita último elemento en caso de pasar el tope
    if (this.logForm.controls.length > 50) {
      this.logForm.controls.pop();
    }
    this.rows = [...this.logForm.controls];
  }

  private setGridColumns() {
    this.columns = [
      {
        name: '',
        prop: 'value.gravedad',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        width: 30,
        cellTemplate: this.iconCellTemplate
      },
      {
        name: Resources.Labels.Aviso,
        prop: 'value.aviso',
        width: 400,
      },
      {
        name: Resources.Labels.FechaYHora,
        prop: 'value.fecha',
      },
      {
        name: Resources.Labels.Accion,
        prop: 'value.accion',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.tableCellTemplate,
        width: 50,
      }
    ];
  }

  private getExistingItem(item: BalanzaAutomatizadaLog) {
    for (let i = 0; i < this.logForm.controls.length; i++) {
      const log = this.logForm.controls[i] as FormGroup;
      if (log.controls.id.value === item.id) {
          const balanzaAutomatizadaLog: BalanzaAutomatizadaLog = {
          id: log.controls.id.value,
          accion: log.controls.accion.value,
          motivo: log.controls.aviso.value,
          fecha: log.controls.fecha.value,
          gravedad: log.controls.gravedad.value,
          requiereAccion: log.controls.requiereAccion.value,
          pathArchestra: log.controls.pathArchestra.value,
          estadoEvento: item.estadoEvento,
          indice: i,
          idDispositivo: log.controls.idDispositivo.value
        };
        return balanzaAutomatizadaLog;
      }
    }
    return null;
  }
}
