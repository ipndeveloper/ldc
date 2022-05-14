import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild } from '@angular/core';
import { Permission, TiposProducto, EstadosViaje, Actividades } from '../../shared/enums/enums';
import { Subject } from 'rxjs';
import { SearchFormActionsNotifierService } from '../../core/components/search-form/services/search-form-actions-notifier.service';
import { FiltroGestionarOrdenesCargaComponent } from './filtro-gestionar-ordenes-carga/filtro-gestionar-ordenes-carga.component';
import { PopupService } from '../../core/services/popupService/popup.service';
import { FormBuilder } from '@angular/forms';
import { SearchFormComponent, BotonesEnum } from '../../core/components/search-form/search-form.component';
import { Resources } from '../../../locale/artifacts/resources';
import { Dictionary } from '../../core/models/dictionary';
import { takeUntil } from 'rxjs/operators';
import { GestionarOrdenesCargaDataView } from '../../shared/data-models/gestionar-ordenes-carga-data-view';
import { OrdenesCargaService } from './ordenes-carga.service';
import { ExcelService } from '../../core/services/excelService/excel.service';
import { NavigationExtras, ActivatedRoute } from '@angular/router';
import { NavigationService } from '../../core/services/navigationService/navigation.service';
import { PageStateService } from '../../core/services/pageStateService/page-state.service';

@Component({
  selector: 'yrd-gestionar-ordenes-carga',
  templateUrl: './gestionar-ordenes-carga.component.html',
  styleUrls: ['./gestionar-ordenes-carga.component.css']
})

export class GestionarOrdenesCargaComponent
     extends SearchFormComponent<Array<GestionarOrdenesCargaDataView>>
  implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild('filtro') filtro: FiltroGestionarOrdenesCargaComponent;
  Permission = Permission;
  IngresarCargaCamionPath = 'ControlarCargaCamion';
  IngresarCargaCamionVarioInsumoPath = 'ControlarCargaCamionVarios';
  GestionarOrdenesCargaPath = 'GestionarOrdenesCarga';
  onDestroy = new Subject();
  selectedRow: any;

  constructor(notificationActionsService: SearchFormActionsNotifierService,
              service: OrdenesCargaService,
              public readonly popupService: PopupService,
              private readonly excelExportService: ExcelService,
              private readonly navigationService: NavigationService,
              private readonly pageStateService: PageStateService,
              private readonly route: ActivatedRoute,
              private readonly fb: FormBuilder) {
    super(service, notificationActionsService, popupService);
    this.botonesHabilitados[BotonesEnum.Consultar] = true;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = true;
    this.permisosBotones[BotonesEnum.Consultar] = Permission.GestionarOrdenesCargaConsultar;
    this.permisosBotones[BotonesEnum.ExportarAExcel] = Permission.GestionarOrdenesCargaExportarAExcel;
  }

  ngOnInit() {
   this.init();
  }

  private init() {
    this.createForm();
    this.setGridColumns();
    this.setFilters();
    this.subscribeToFiltersChanges();
    this.subscribeToActionEventsPrivate();
    this.navigationService.requestExtras()
      .pipe(takeUntil(this.onDestroy))
      .subscribe((_: any) => {
        const prevState = this.pageStateService.getState(this.route.toString());
        if (prevState) {
          this.form.patchValue(prevState);
          this.search();
          this.pageStateService.deleteState();
        }
      });
  }

  ngAfterViewInit() {
    this.filtro.setFocus();
  }

  ngOnDestroy(): void {
    this.onDestroy.next();
    this.clearSubscriptions();
  }

  private createForm() {
    this.form = this.fb.group({
      filtros: this.fb.group({
        ordenCarga: {value: '', disabled: false },
        patente: {value: '', disabled: false },
        estadoCabecera: { value: '', disabled: false },
        estadoViaje: { value: '', disabled: false },
        tipoProducto: { value: '', disabled: false  },
        producto: { value: undefined, disabled: false  },
        destinatario: { value: undefined, disabled: false  },
        transportista: { value: undefined, disabled: false }
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
        name: Resources.Labels.OrdenCarga,
        prop: 'ordenCarga'
      },
      {
        name: Resources.Labels.NroViaje,
        prop: 'nroViaje'
      },
      {
        name: Resources.Labels.Transportista,
        prop: 'transportista'
      },
      // {
      //   name: Resources.Labels.TipoDocumentoPorte,
      //   prop: 'tipoDocPorte'
      // },
      // {
      //   name: Resources.Labels.DocumentoPorte,
      //   prop: 'documentoPorte'
      // },
      {
        name: Resources.Labels.Chofer,
        prop: 'chofer'
      },
      {
        name: Resources.Labels.PatenteCamion,
        prop: 'patenteChasis'
      },
      {
        name: Resources.Labels.PatenteAcoplado,
        prop: 'patenteAcoplado'
      },
      {
        name: Resources.Labels.FechaVigenciaDesdeHasta,
        prop: 'fechaDesdeHasta'
      },
      {
        name: Resources.Labels.Producto,
        prop: 'producto'
      },
      {
        name: Resources.Labels.EstadoViaje,
        prop: 'estadoViaje'
      },
    ];
  }

  private setFilters() {
    this.filters = new Dictionary<any>();
  }

  private subscribeToFiltersChanges() {
    const ordenCarga = this.form.get('filtros.ordenCarga');
    const patente = this.form.get('filtros.patente');
    const estadoCabecera = this.form.get('filtros.estadoCabecera');
    const estadoViaje = this.form.get('filtros.estadoViaje');
    const tipoProducto = this.form.get('filtros.tipoProducto');
    const producto = this.form.get('filtros.producto');
    const destinatario = this.form.get('filtros.destinatario');
    const transportista = this.form.get('filtros.transportista');


    if (ordenCarga && patente && estadoCabecera && estadoViaje && tipoProducto && producto &&
        destinatario && transportista) {
      ordenCarga.valueChanges.subscribe((value: string) => {
        this.filters['ordenCarga'] = value;
      });
      patente.valueChanges.subscribe((value) => {
        this.filters['patente'] = value;
      });
      estadoCabecera.valueChanges.subscribe((value) => {
        this.filters['estadoCabecera'] = value;
      });
      estadoViaje.valueChanges.subscribe((value) => {
        this.filters['estadoViaje'] = value;
      });
      tipoProducto.valueChanges.subscribe((value) => {
        this.filters['tipoProducto'] = value;
      });
      producto.valueChanges.subscribe((value) => {
        this.filters['producto'] = value;
      });
      destinatario.valueChanges.subscribe((value) => {
        this.filters['destinatario'] = value;
      });
      transportista.valueChanges.subscribe((value) => {
        this.filters['transportista'] = value;
      });
    }

  }

  private subscribeToActionEventsPrivate() {
    this.notificationActionsService.clickView
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickView(row)
      );

    this.notificationActionsService.clickEdit
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickEdit(row)
      );

    this.notificationActionsService.clickExcelExport
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(rows =>
        this.clickExcelExport(rows)
      );

    this.notificationActionsService.selectedRows
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(row =>
        this.clickSelectedRow(row)
      );

    this.notificationActionsService.clickClear
      .pipe(
        takeUntil(this.onDestroy)
      )
      .subscribe(() =>
        this.clickClear()
      );
  }

  private clickView(row) {
    this.editViewAction(row, false);
  }

  private clickEdit(row: GestionarOrdenesCargaDataView) {
    if (row) {
      if (row.idEstadoViaje !== EstadosViaje.Pendiente) {
        this.popupService.error(Resources.Messages.NoEsPosibleIngresarOrdenCargaEstadoIncorrecto, Resources.Labels.Error);
        return;
      }
      if (!this.ValidarFechaDesdeHasta(row.fechaVigenciaDesde, row.fechaVigenciaHasta)) {
        this.popupService.error(Resources.Messages.FechaActualNoSeEncuentraRangoOrdenCarga, Resources.Labels.Error);
        return;
      }
      if (row.choferPenalizado) {
        this.confirmAceptar().then(respuesta => {
          if (respuesta) {
            this.editViewAction(row, true);
          }
        });
      } else {
        this.editViewAction(row, true);
      }
    }
  }

  protected ValidarFechaDesdeHasta(fechaDesde: string, fechaHasta: string): boolean {
    let fechasValidas = true;

    if (fechaDesde && fechaHasta) {
      const fechaDesdeDate = (new Date(fechaDesde + 'T00:00:00')).valueOf();
      const fechaHastaDate = (new Date(fechaHasta + 'T00:00:00')).valueOf();
      const fechaHoy = (new Date()).setHours(0, 0, 0, 0).valueOf();
      if (!((fechaHoy >= fechaDesdeDate) && (fechaHoy <= fechaHastaDate))) {
        fechasValidas = false;
      }
    }
    return fechasValidas;
  }


  private confirmAceptar(): Promise<boolean> {
    return this.popupService.confirm(Resources.Messages.ElChoferSeEncuentraPenalizadoContinuar, Resources.Labels.Confirmar);
  }

  private clickExcelExport(dataGrid) {
    this.excelExportService.exportDataGridAsExcel([dataGrid], 'Gestión de ordenes de carga', ['Gestión de ordendes de carga']);
  }

  private clickClear() {
    this.clear();
  }

  public clear() {
    this.form.reset( {emitEvent: true} );
    this.selectedRow = null;
    this.init();
  }

  private editViewAction(row: GestionarOrdenesCargaDataView, esIngreso: boolean) {
    if (row) {
      const viaje = row as GestionarOrdenesCargaDataView;
      const navigationExtras: NavigationExtras = {
          queryParams: {
              'idViaje' : viaje.id,
              'esModificacion' : esIngreso,
              'idTipoProducto' : viaje.idTipoProducto,
              'idActividad' : Actividades.ControlarIngresoCargaCamion,
              'idMovimiento' : viaje.idMovimiento
          }
      };
      this.pageStateService.saveState(this.form.getRawValue(), this.route.toString());
      switch (viaje.idTipoProducto) {
        case TiposProducto.Cereal:
        case TiposProducto.NoGranos:
        case TiposProducto.SubProductos:
          this.navigationService.navigate(this.GestionarOrdenesCargaPath,
                                          this.IngresarCargaCamionPath,
                                          navigationExtras);
          break;
        case TiposProducto.Varios:
        case TiposProducto.Insumos:
        case TiposProducto.Chatarra:
        case TiposProducto.Decomiso:
        default:
          this.navigationService.navigate(this.GestionarOrdenesCargaPath,
                                          this.IngresarCargaCamionVarioInsumoPath,
                                          navigationExtras);
          break;
      }
    }
  }

  private clickSelectedRow(row) {
    this.selectedRow = null;
    if (row !== undefined) {
      this.selectedRow = row;
    }
  }

  onIngresar() {
    this.clickEdit(this.selectedRow[0]);
  }
}
