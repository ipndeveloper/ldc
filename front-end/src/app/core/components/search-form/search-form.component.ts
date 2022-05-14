import { ViewChild } from '@angular/core';
import { SearchFormService } from './services/search-form.service';
import { DataGridComponent } from '../../controls/data-grid/data-grid.component';
import { Dictionary } from '../../models/dictionary';
import { FormGroup } from '@angular/forms';
import { SearchFormActionsNotifierService } from './services/search-form-actions-notifier.service';
import { PopupService } from '../../services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { Subscription } from 'rxjs';

export enum BotonesEnum {
  Modificar = 0,
  Agregar,
  ExportarAExcel,
  Consultar,
  Eliminar,
  Copiar
}

export class RowsOptions {
  rows: any[] = [];
  selected: any[] = [];
}

export abstract class SearchFormComponent<TOutput> {

  @ViewChild('dataGrid') dataGrid: DataGridComponent;

  private searchSubscription: Subscription;
  botonesHabilitados: Dictionary<boolean> = new Dictionary<boolean>();
  permisosBotones: Dictionary<string> = new Dictionary<string>();
  form: FormGroup;
  filters: Dictionary<string>;
  columns: any;
  rowsOptions: RowsOptions;

  get rows(): any[] {
    return this.rowsOptions.rows;
  }

  set rows(value: any[]) {
    this.rowsOptions.rows = value;
  }

  get selected(): any {
    return this.rowsOptions.selected;
  }

  set selected(value: any) {
    this.rowsOptions.selected = value;
  }

  get selectedId(): number {
    if (this.selected && this.selected.length === 1) {
      return this.selected[0].id;
    }
    return 0;
  }

  constructor(protected readonly searchService: SearchFormService<TOutput>,
              public readonly notificationActionsService: SearchFormActionsNotifierService,
              public readonly popupService: PopupService) {
    this.rowsOptions = new RowsOptions();
    this.botonesHabilitados[BotonesEnum.Modificar] = false;
    this.botonesHabilitados[BotonesEnum.Agregar] = false;
    this.botonesHabilitados[BotonesEnum.ExportarAExcel] = false;
    this.botonesHabilitados[BotonesEnum.Consultar] = false;
    this.botonesHabilitados[BotonesEnum.Eliminar] = false;
    this.botonesHabilitados[BotonesEnum.Copiar] = false;
    this.subscribeToActionEvents();
  }

  private subscribeToActionEvents() {
    this.searchSubscription = this.notificationActionsService.clickSearch.subscribe(() => {
      this.onClickSearch();
    });
  }

  cloneFilters() {
    const target = new Dictionary<string>();
    for (const key of this.filters.keys()) {
      target.add(key, this.filters.item(key));
    }
    return target;
  }

  onClickSearch() {
    if (this.searchService.validateSearchClick(this.filters)) {
      this.search();
    }
  }

  protected search() {
    this.selected = [];
    this.searchService.getData(this.filters).subscribe(results => {
      if (results instanceof Array) {
        if (results.length === 0) {
          this.popupService.error(Resources.Messages.NoSeEncontraronResultados);
        }
        this.rows = [];
        const dataBinding = <Array<TOutput>><any>results;
        this.rows = [...dataBinding];
      }
    });
  }

  protected clearSubscriptions() {
    this.searchSubscription.unsubscribe();
  }
}
