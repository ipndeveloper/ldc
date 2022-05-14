import { Output, EventEmitter, Injectable } from '@angular/core';

@Injectable()

export class SearchFormActionsNotifierService {

  @Output() clickAdd: EventEmitter<void> = new EventEmitter();
  @Output() clickClear: EventEmitter<void> = new EventEmitter();
  @Output() clickEdit: EventEmitter<any> = new EventEmitter();
  @Output() clickExcelExport: EventEmitter<any> = new EventEmitter();
  @Output() clickDelete: EventEmitter<any> = new EventEmitter();
  @Output() clickSearch: EventEmitter<void> = new EventEmitter();
  @Output() clickView: EventEmitter<any> = new EventEmitter();
  @Output() clickCopy: EventEmitter<any> = new EventEmitter();
  @Output() invalidFilters: EventEmitter<void> = new EventEmitter();
  @Output() refreshGrid: EventEmitter<void> = new EventEmitter();
  @Output() selectedRows: EventEmitter<any> = new EventEmitter();

  onAdd() {
    this.clickAdd.emit();
  }

  onClickClear() {
    this.clickClear.emit();
  }

  onClickEdit(row: any) {
    this.clickEdit.emit(row);
  }

  onClickExcelExport(dataGrid: any) {
    this.clickExcelExport.emit(dataGrid);
  }

  onClickDelete(row: any) {
    this.clickDelete.emit(row);
  }

  onClickSearch() {
    this.clickSearch.emit();
  }

  onClickView(row: any) {
    this.clickView.emit(row);
  }

  onInvalidFilters() {
    this.invalidFilters.emit();
  }

  onRefreshGrid() {
    this.refreshGrid.emit();
  }

  onSelectedRows(rows: any) {
    this.selectedRows.emit(rows);
  }

  onClickCopy(row: any) {
    this.clickCopy.emit(row);
  }
}
