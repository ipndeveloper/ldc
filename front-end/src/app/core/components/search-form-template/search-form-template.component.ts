import { Component, Input, ContentChild, ViewChild, TemplateRef, OnDestroy, OnInit } from '@angular/core';
import { Dictionary } from '../../models/dictionary';
import { Resources } from '../../../../locale/artifacts/resources';
import { DataGridComponent } from '../../controls/data-grid/data-grid.component';
import { SearchFormActionsNotifierService } from '../search-form/services/search-form-actions-notifier.service';
import { PopupService } from '../../services/popupService/popup.service';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RowsOptions } from '../search-form/search-form.component';

@Component({
  selector: 'yrd-search-form-template',
  templateUrl: './search-form-template.component.html',
  styleUrls: ['./search-form-template.component.css']
})

export class SearchFormTemplateComponent implements OnInit, OnDestroy {

  @Input() allowsMultipleSelection = false;
  @Input() columns: any;
  @Input() filters: Dictionary<string>;
  @Input() addTitleButton = Resources.Labels.Agregar;
  @Input() removeTitleButton = Resources.Labels.Eliminar;
  @Input() searchTitleButton = Resources.Labels.Buscar;
  @Input() clearTitleButton = Resources.Labels.Limpiar;
  @Input() viewTitleButton = Resources.Labels.Consultar;
  @Input() editTitleButton = Resources.Labels.Modificar;
  @Input() copyTitleButton = Resources.Labels.Copiar;
  @Input() excelExportTitleButton = Resources.Labels.ExportarAExcel;
  @Input() botonesHabilitados: Dictionary<boolean>;
  @Input() permisosBotones: Dictionary<string>;
  @Input() filtersLegendTitle = Resources.Labels.Busqueda;
  @Input() dataEditLegendTitle = Resources.Labels.Detalle;
  @Input() resultsLegendTitle = Resources.Labels.ResultadoBusqueda;
  @Input() optionalContainerLegendTitle = Resources.Labels.Detalle;
  @Input() filtrosForm: FormGroup;
  @Input() hasDataEditSection = false;
  @Input() hasFilterSection = true;
  @Input() canSearch: boolean;
  @Input() singleSelection = false;
  @Input() enableOptionalContainer = false;
  @Input() rowsOptions: RowsOptions;

  get rows(): any[] {
    return this.rowsOptions.rows;
  }

  set rows(value: any[]) {
    this.rowsOptions.rows = value;
  }

  get selectedRowsByUser(): any {
    return this.rowsOptions.selected;
  }

  set selectedRowsByUser(value: any) {
    this.rowsOptions.selected = value;
  }

  get multipleSelectionValidation(): boolean {
    if (this.singleSelection) {
      return this.selectedRowsByUser && this.selectedRowsByUser.length !== 1;
    } else {
      return this.selectedRowsByUser && this.selectedRowsByUser.length === 0;
    }
  }

  @ContentChild('controlFiltersContainer') filtersContainer: TemplateRef<any>;
  @ContentChild('controlActionsContainer') actionsContainer: TemplateRef<any>;
  @ContentChild('controlEditDataContainer') editDataContainer: TemplateRef<any>;
  @ContentChild('controlOptionalContainer') optionalContainer: TemplateRef<any>;

  @ViewChild('dataGrid') dataGrid: DataGridComponent;

  private onDestroy = new Subject();

  constructor(private readonly actionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService) {
  }

  ngOnInit() {
    this.canSearch = true;
    this.actionsService.refreshGrid
      .pipe(takeUntil(this.onDestroy))
      .subscribe(() => this.regreshGrid());
  }

  ngOnDestroy() {
    this.onDestroy.next();
  }

  onClickDelete() {
    this.selectedRowsByUser = this.repairRemovedRowsCollection(this.selectedRowsByUser);
    if (this.selectedRowsByUser && this.selectedRowsByUser.length === 1) {
      this.popupService.confirmOk(
        () => this.actionsService.onClickDelete(this.selectedRowsByUser[0]),
        Resources.Messages.EstaSeguroQueDeseaEliminarElRegistroSeleccionado,
        Resources.Labels.Eliminar);
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Eliminar);
    }
  }

  onClickSearch() {
    this.actionsService.onSelectedRows([]);
    if (!this.filtrosForm || this.filtrosForm.valid) {
      this.actionsService.onClickSearch();
    } else {
      this.popupService.error(Resources.Messages.VerificarDatosFiltroBusqueda);
      this.actionsService.onInvalidFilters();
    }
  }

  onSelect(rows) {
    this.selectedRowsByUser = [];
    this.selectedRowsByUser = this.repairRemovedRowsCollection(rows['selected']);
    this.actionsService.onSelectedRows(this.selectedRowsByUser);
  }

  onClickAdd() {
    this.actionsService.onAdd();
  }

  onClickClear() {
    this.canSearch = true;
    this.rows = [];
    this.actionsService.onSelectedRows([]);
    this.actionsService.onClickClear();
    this.selectedRowsByUser = [];
  }

  onClickView() {
    if (this.selectedRowsByUser && this.selectedRowsByUser.length === 1) {
      this.actionsService.onClickView(this.selectedRowsByUser[0]);
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Consultar);
    }
  }

  onClickEdit() {
    if (!this.singleSelection && this.selectedRowsByUser) {
      this.actionsService.onClickEdit(this.selectedRowsByUser);
    } else {
      if (this.selectedRowsByUser && this.selectedRowsByUser.length === 1) {
        this.actionsService.onClickEdit(this.selectedRowsByUser[0]);
      } else {
        this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Modificacion);
      }
    }
  }

  onClickExcelExport() {
    if (this.dataGrid && this.dataGrid.rows && this.dataGrid.rows.length > 0) {
      this.actionsService.onClickExcelExport(this.dataGrid);
    } else {
      this.popupService.error(Resources.Messages.DebeHaberAlMenosUnRegistroParaExportar, Resources.Labels.ExportarAExcel);
    }
  }

  onClickCopy() {
    if (this.selectedRowsByUser && this.selectedRowsByUser.length === 1) {
      this.actionsService.onClickCopy(this.selectedRowsByUser[0]);
    } else {
      this.popupService.error(Resources.Messages.PorFavorSeleccioneUnUnicoRegistro, Resources.Labels.Copiado);
    }
  }

  private repairRemovedRowsCollection(currentSelectedRows: any) {
    const lastSelectedRows = <Array<any>>currentSelectedRows;
    const realRows = <Array<any>><any>this.rows;
    const arrToRemove = new Array<number>();
    let index = -1;

    for (const currentSelectedRow of lastSelectedRows) {
      index++;
      const indexManipuleo = realRows.indexOf(currentSelectedRow, 0);
      if (indexManipuleo === -1) {
        arrToRemove.push(index);
      }
    }

    arrToRemove.slice().reverse().forEach(function(indexToRemove) {
      lastSelectedRows.splice(indexToRemove, 1);
    });

    return lastSelectedRows;
  }

  public regreshGrid() {
    this.selectedRowsByUser = [];
    this.actionsService.onClickSearch();
  }

  public removeRowFromGrid(row: any) {
    const indexFromRow = this.selectedRowsByUser.indexOf(row, 0);
    if (indexFromRow >= 0) {
      this.selectedRowsByUser.splice(indexFromRow, 1);
    }
  }
}
