import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { MovimientoReversionSalida } from '../../shared/data-models/movimiento-reversion-salida';
import { AbstractControl, FormBuilder, FormGroup } from '@angular/forms';
import { SearchReversarSalidaService } from './services/search-reversar-salida.service';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { DesplegableEstadoMovimientoFilter } from '../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento-filter';
import { Actividades, ComportamientoAfip } from '../../shared/enums/enums';
import { Subject } from 'rxjs';
import { map, takeUntil } from 'rxjs/operators';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { Producto } from '../../shared/data-models/producto';
import { TipoMovimiento } from '../../shared/data-models/tipo-movimiento';
import { TipoTransporte } from '../../shared/data-models/tipo-transporte';
import { TipoDocumentoPorte } from '../shared/data-models/tipo-documento-porte';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { ModalReversarSalidaComponent } from './modal-reversar-salida/modal-reversar-salida.component';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TipoDocumentoPorteService } from '../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';


@Component({
  selector: 'yrd-reversar-salida',
  templateUrl: './reversar-salida.component.html',
  styleUrls: ['./reversar-salida.component.css']
})
export class ReversarSalidaComponent extends SearchFormComponent<Array<MovimientoReversionSalida>>
implements OnInit, OnDestroy {
  [x: string]: any;

  reversarSalidaForm: FormGroup;
  columns: any;
  estadoMovimientoFilters: DesplegableEstadoMovimientoFilter;
  selectedRow: any;
  resultados: EntityWithDescription[];
  private readonly onDestroy = new Subject();
  private readonly onFirstExecution = new Subject();
  @ViewChild('modalReversarSalida') modalReversarSalida: ModalReversarSalidaComponent;

  constructor(private readonly fb: FormBuilder,
    private readonly searchReversarSalidaService: SearchReversarSalidaService,
    public readonly notificationActionsService: SearchFormActionsNotifierService,
    private readonly dropdownNotificationService:  DropdownNotificationService<EstadoMovimiento>,
    private readonly excelExportService: ExcelService,
    public readonly popupService: PopupService,
    public readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    super(searchReversarSalidaService, notificationActionsService, popupService);
    this.botonesHabilitados = new Dictionary<boolean>();
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
  }

  ngOnInit() {
    this.setFilters();
    this.init();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  onClickReversarSalida() {
    if (this.selectedRow && this.selectedRow.length === 1) {
      this.searchReversarSalidaService.getResultadosParaReversar(this.selectedRow[0].id)
        .subscribe((resultados: EntityWithDescription[]) => {
          if (resultados.length !== 0) {
            this.resultados = resultados;
            this.modalReversarSalida.open();
          } else  {
            this.popupService.error(Resources.Messages.ElMovimientoNoSeEncuentraEnUnEstadoValidoParaRecibirEstaAccion,
                                                                Resources.Labels.Error);
          }
        });
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.ReversarSalida);
    }
  }

  onConfirmReversarSalida(message: string) {
    this.popupService.success(message, Resources.Labels.ReversarSalida);
    this.notificationActionsService.onRefreshGrid();
  }

  private init() {
    this.createForm();
    this.setGridColumns();
    this.completeEstadoMovimientos();
    this.subscribeToActionEventsPrivate();
    this.subscribeToFiltersChanges();
    this.subscribeToDropDownEvents().subscribe(() => {
      this.search();
      this.onFirstExecution.next();
    });
    this.setValuesByDefault();
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
    this.filters.add('tipoTransporte', '');
    this.filters.add('tipoMovimiento', '');
    this.filters.add('idEstado', '');
    this.filters.add('patente', '');
    this.filters.add('producto', '');
    this.filters.add('tipoDocumentoPorte', '');
    this.filters.add('numeroDocumentoPorte', '');
    this.filters.add('allEstadoMovimiento', '');
    this.filters.add('numeroVagon', '');
  }

  private createForm() {
    this.reversarSalidaForm = this.fb.group({
      filtros: this.fb.group({
        tipoTransporte: '',
        tipoMovimiento: '',
        estadoMovimiento: '',
        patente: '',
        numeroVagon: { value: '', disabled: false },
        producto: { value: undefined, disabled: false },
        tipoDocPorte: '',
        nroDocPorte: '',
        ctg: ''
      })
    });
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'selected',
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
        name: Resources.Labels.TipoTransporte,
        prop: 'tipoTransporte'
      },
      {
        name: Resources.Labels.TipoMovimiento,
        prop: 'tipoMovimiento'
      },
      {
        name: Resources.Labels.TipoDocumentoPorte,
        prop: 'tipoDocumentoPorte'
      },
      {
        name: Resources.Labels.NumeroDocumentoPorte,
        prop: 'numeroDocumentoPorte'
      },
      {
        name: Resources.Labels.CTG,
        prop: 'ctg'
      },
      {
        name: Resources.Labels.Patente,
        prop: 'patente'
      },
      {
        name: Resources.Labels.Vagon,
        prop: 'numeroVagon'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.Estado,
        prop: 'estado'
      }
    ];
  }

  private completeEstadoMovimientos() {

    this.estadoMovimientoFilters = new DesplegableEstadoMovimientoFilter();

    this.estadoMovimientoFilters.idsActividad = [
      Actividades.ReversarSalida,
      Actividades.ReversarSalidaCarga
    ];
  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickSelectedRow(row)
      );

    this.notificationActionsService.clickSearch
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.selectedRow = null
      );

    this.notificationActionsService.clickExcelExport
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(rows =>
        this.clickExcelExport(rows)
      );

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clear()
      );
  }

  private subscribeToFiltersChanges() {
    const tipoTransporteCtrl = this.reversarSalidaForm.get('filtros.tipoTransporte');
    const tipoMovimientoCtrl = this.reversarSalidaForm.get('filtros.tipoMovimiento');
    const patenteCtrl = this.reversarSalidaForm.get('filtros.patente');
    const estadoCtrl  = this.reversarSalidaForm.get('filtros.estadoMovimiento');
    const productoCtrl  = this.reversarSalidaForm.get('filtros.producto');
    const tipoDocPorteCtrl  = this.reversarSalidaForm.get('filtros.tipoDocPorte');
    const nroDocPorteCtrl  = this.reversarSalidaForm.get('filtros.nroDocPorte');
    const ctgCtrl  = this.reversarSalidaForm.get('filtros.ctg');
    const numeroVagon  = this.reversarSalidaForm.get('filtros.numeroVagon');

    if (tipoTransporteCtrl && tipoMovimientoCtrl && patenteCtrl && estadoCtrl &&
      productoCtrl && tipoDocPorteCtrl && nroDocPorteCtrl && numeroVagon && ctgCtrl) {

      tipoTransporteCtrl.valueChanges.subscribe((tipoTransporteValue: TipoTransporte) => {
        this.filters['tipoTransporte'] = tipoTransporteValue;
      });
      tipoMovimientoCtrl.valueChanges.subscribe((tipoMovimientoValue: TipoMovimiento) => {
        this.filters['tipoMovimiento'] = tipoMovimientoValue;
      });
      patenteCtrl.valueChanges.subscribe((patenteValue: string) => {
        this.filters['patente'] = patenteValue;
      });
      estadoCtrl.valueChanges.subscribe((estadoValue: EstadoMovimiento) => {
        if (estadoValue) {
          this.filters['idEstado'] = estadoValue.id;
        }
      });
      productoCtrl.valueChanges.subscribe((productoValue: Producto) => {
        this.filters['producto'] = productoValue;
      });
      tipoDocPorteCtrl.valueChanges.subscribe((tipoDocPorteValue: TipoDocumentoPorte) => {
        this.filters['tipoDocumentoPorte'] = tipoDocPorteValue;
        this.consultarRegimenAfip(tipoDocPorteValue, ctgCtrl);
      });
      nroDocPorteCtrl.valueChanges.subscribe((nroDocPorteValue: string) => {
        this.filters['numeroDocumentoPorte'] = nroDocPorteValue;
      });
      ctgCtrl.valueChanges.subscribe((ctgValue: string) => {
        this.filters['ctg'] = ctgValue;
      });
      numeroVagon.valueChanges.subscribe((nroVagon: string) => {
        this.filters['numeroVagon'] = nroVagon;
      });
    }
  }

  consultarRegimenAfip(tipoDocumento: any, ctgCtrl: AbstractControl) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined)) {
          ctgCtrl.enable();
          return;
        }
        ctgCtrl.disable();
        ctgCtrl.reset();
      });
  }

  private subscribeToDropDownEvents() {
    return this.dropdownNotificationService.allItemsWereSelected
      .pipe(
        takeUntil(this.onFirstExecution),
        map(entities =>
          this.filters['allEstadoMovimiento'] = entities
        )
      );
  }

  private setValuesByDefault() {
    this.setValue(`filtros.estadoMovimiento`, new EstadoMovimiento(-1, Resources.Labels.Todos) , {onlySelf: true});
  }

  private setValue(controlName: string, value: any, options: any) {
    const control = this.reversarSalidaForm.get(controlName);
    if (control) {
      control.patchValue(value, options);
      control.reset(value, options);
      control.setValue(value, options);
    }
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== 'undefined') {
      this.selectedRow = row;
    }
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Reversar salida', ['Movimientos']);
  }

  private clear() {
    this.reversarSalidaForm.reset( {emitEvent: true} );
    this.selectedRow = null;
    this.init();
  }
}
