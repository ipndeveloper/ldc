import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { CalidadPorLaboratorioDataView } from './calidad-por-laboratorio-data-view';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Dictionary } from '../../core/models/dictionary';
import { Subject } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';
import { Circuito } from '../../shared/data-models/circuito/circuito';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { GestionarCalidadPorLaboratorioService } from './service/gestionar-calidad-por-laboratorio.service';
import { Resources } from '../../../locale/artifacts/resources';
import { Actividades, Caracteristicas, Permission } from '../../shared/enums/enums';
import { ModalDetalleMuestrasComponent } from './modal-detalle-muestras/modal-detalle-muestras.component';
import { ModalRegistrarDecisionLaboratorioComponent } from './modal-registrar-decision-laboratorio/modal-registrar-decision-laboratorio.component';
import { EstadoMovimientoService } from '../../shared/desplegable-estado-movimiento/estado-movimiento.service';

@Component({
  selector: 'yrd-gestionar-calidad-por-laboratorio',
  templateUrl: './gestionar-calidad-por-laboratorio.component.html',
  styleUrls: ['./gestionar-calidad-por-laboratorio.component.css']
})
export class GestionarCalidadPorLaboratorioComponent  extends SearchFormComponent<Array<CalidadPorLaboratorioDataView>>
implements OnInit, OnDestroy {
  Permission = Permission;

  @ViewChild('modalDetalleMuestras') modalDetalleMuestras: ModalDetalleMuestrasComponent;
  @ViewChild('modalRegistrarDecision') modalRegistrarDecision: ModalRegistrarDecisionLaboratorioComponent;
  form: FormGroup;
  filters: Dictionary<string>;
  selectedRow: any;
  estadosValidos: number[];
  private readonly onDestroy = new Subject();
  circuito: Circuito;
  accionesHabilitadas: any[] = [];
  constructor(private readonly fb: FormBuilder,
              private readonly estadoMovimientoService: EstadoMovimientoService,
              private readonly gestionarCalidadPorLaboratorioService: GestionarCalidadPorLaboratorioService,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService,
              private readonly excelExportService: ExcelService) {
    super(gestionarCalidadPorLaboratorioService, notificationActionsService, popupService);
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
   }

  ngOnInit() {
    this.setFilters();
    this.Init();
    this.search();
    this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(undefined,
                                                                        [
                                                                          Actividades.RegistrarDecisionLaboratorio,
                                                                          Actividades.DeterminarCoeficiente,
                                                                          Actividades.DeterminarCoeficientePostBalanza
                                                                        ])
                                .subscribe(estados => {
                                  this.estadosValidos = new Array<number>();
                                  estados.forEach(estado => this.estadosValidos.push(estado.id));
                                });
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private Init() {
    this.createForm();
    this.setGridColumns();
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
  }

  private setGridColumns() {
    this.columns = [
      { prop: 'selected',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        headerCheckboxable: true,
        checkboxable: true,
        width: 30
      },
      {
        name: Resources.Labels.Turno,
        prop: 'turno'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Patente,
        prop: 'patente'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      }
    ];
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickExcelExport
      .pipe(takeUntil(this.onDestroy))
      .subscribe(rows => this.clickExcelExport(rows));

    this.notificationActionsService.selectedRows
      .pipe(takeUntil(this.onDestroy))
      .subscribe(row => this.clickSelectedRow(row));

    this.notificationActionsService.clickClear
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.clickClear());
  }

  private clickSelectedRow(row) {
    this.selectedRow = row;
  }

  private clickClear() {
    this.clear();
  }

  public clear() {
    this.form.reset({ emitEvent: true });
    this.selectedRow = null;
    this.Init();
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de Laboratorio', ['Gestión de Laboratorio']);
  }

  private subscribeToFiltersChanges() {
    const codigoMuestraCtrl = this.form.get('filtros.codigoMuestra');
    const patenteCtrl  = this.form.get('filtros.patente');
    const productoCtrl = this.form.get('filtros.producto');
    const turnoCtrl  = this.form.get('filtros.turno');

    if (codigoMuestraCtrl && patenteCtrl && turnoCtrl && productoCtrl) {
      codigoMuestraCtrl.valueChanges.subscribe((value: string) => {
        this.filters['codigoMuestra'] = value;
      });
      patenteCtrl.valueChanges.subscribe((value: string) => {
        this.filters['patente'] = value;
      });
      productoCtrl.valueChanges.subscribe((value: string) => {
        this.filters['producto'] = value;
      });
      turnoCtrl.valueChanges.subscribe((value: string) => {
        this.filters['turno'] = value;
      });
    }
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        codigoMuestra: '',
        patente: '',
        producto: { value: undefined, disabled: false },
        turno: ''
      }),
    });
  }

  private getCircuito(idCalidadMovimientoCereal: number) {
    return this.gestionarCalidadPorLaboratorioService.getCircuito(idCalidadMovimientoCereal)
      .pipe(
        map(result => {
          const circuito = new Circuito();
          Object.assign(circuito, result);
          return circuito;
        })
      );
  }

  onClickConsultarMuestras() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      this.modalDetalleMuestras.open(this.selectedRow[0].id);
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Rechazar);
    }
  }

  onClickRegistrarDecision() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      if (this.estadosValidos.some(e => e === (this.selectedRow[0] as CalidadPorLaboratorioDataView).idEstadoMovimiento)) {
        this.getCircuito(this.selectedRow[0].id)
          .subscribe((circuito: Circuito) => {
            this.circuito = circuito;
            this.habilitarCaracteristicas();
            this.modalRegistrarDecision.open(this.selectedRow[0]);
          });
      } else {
        this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnEstadoValidoModificacion, Resources.Labels.Error);
      }
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Rechazar);
    }
  }

  onDecisionRegistrada() {
    this.popupService.success(Resources.Messages.DecisionRegistrada, Resources.Labels.Aceptar);
    this.selectedRow = undefined;
    this.search();
  }

  private habilitarCaracteristicas() {
    this.accionesHabilitadas = [
      {
        accion: 'AprobarActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionLaboratorioAprobar])
      }, {
        accion: 'RechazarActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionLaboratorioRechazar])
      }, {
        accion: 'ReCalarActivado',
        activada: this.circuito.debeActivarCaracteristica([Caracteristicas.AccionLaboratorioReCalar])
      }
    ];
  }
}
