import { Component, Input, Output, EventEmitter } from '@angular/core';
import { TipoSeleccionDataGrid } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-data-grid',
  templateUrl: './data-grid.component.html',
  styleUrls: ['./data-grid.component.css']
})
export class DataGridComponent {

  @Input() rows: any;
  @Input() selected: any[] = [];
  @Input() columns: any;
  @Input() limitRecords = 20;
  @Input() pagination = false;
  @Input() rowHeight = 'auto';
  @Input() singleSelection = false;
  @Input() disableSelection = false;
  @Input() rubrosPorTipoAnalisis: any[] = [];
  @Output() select: EventEmitter<any> = new EventEmitter();

  get selectionType() {
    return this.singleSelection ? TipoSeleccionDataGrid.single :  TipoSeleccionDataGrid.checkbox;
  }

  get footerHeight() {
    return this.pagination && this.rows && this.selected ? 30 : null;
  }

  get limit() {
    return this.pagination ? this.limitRecords : undefined;
  }

  constructor() {
  }

  onSelect(row) {
    if (this.disableSelection) {
      this.selected = [];
      row.selected = [];
      this.rubrosPorTipoAnalisis.forEach(r => {
        this.selected.push(r);
        row.selected.push(r);
      });
    }
    this.select.emit(row);
  }

  singleSelectCheck(row: any) {
    if (this.selectionType === TipoSeleccionDataGrid.single) {
      return this.selected && this.selected.indexOf ? this.selected.indexOf(row) === -1 : true;
    }
    return true;
  }
}
