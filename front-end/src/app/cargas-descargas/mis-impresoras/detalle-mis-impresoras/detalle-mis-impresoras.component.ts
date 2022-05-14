import { Component, OnInit, Input, TemplateRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { MisImpresorasDataView } from '../../../shared/data-models/mis-impresoras-data-view';

@Component({
  selector: 'yrd-detalle-mis-impresoras',
  templateUrl: './detalle-mis-impresoras.component.html',
  styleUrls: ['./detalle-mis-impresoras.component.css']
})
export class DetalleMisImpresorasComponent implements OnInit {

  @ViewChild('tableHeaderTemplate') tableHeaderTemplate: TemplateRef<any>;
  @ViewChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;

  @Input() form: FormGroup;
  @Output() marcarPorDefectoClicked = new EventEmitter();

  get impresorasFormArray() {
    return this.form.controls.impresoras as FormArray;
  }

  columns: any;
  rows: any;
  selectedRows: any = [];

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.setGridColumns();
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
        cellTemplate: this.tableCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.Impresora,
        prop: 'value.impresora',
      },
      {
        name: Resources.Labels.PorDefecto,
        prop: 'value.porDefecto',
        width: 30
      },
      {
        name: Resources.Labels.ImpresoraHabilitada,
        prop: 'value.estaHabilitado',
        width: 30
      }
    ];
  }

  onSelect(rows: any) {
    this.selectedRows = rows.selected;
  }

  setImpresoras(impresoras: MisImpresorasDataView[]) {
    while (this.impresorasFormArray.length !== 0) {
      this.impresorasFormArray.removeAt(0);
    }
    impresoras.forEach((imp: MisImpresorasDataView) => {
      this.impresorasFormArray.push(this.createImpresora(imp));
    });
    this.refreshGrid();
  }

  private refreshGrid() {
    this.selectedRows = [];
    this.rows = [...this.impresorasFormArray.controls];
  }

  private createImpresora(impresora: MisImpresorasDataView) {
    return this.fb.group({
      id: impresora.id,
      impresora: impresora.impresora,
      porDefecto: impresora.porDefecto,
      estaHabilitado: impresora.habilitado
    });
  }

  onMarcarPorDefecto() {
    if (this.selectedRows && this.selectedRows.length === 1) {
      this.marcarPorDefectoClicked.emit(this.selectedRows[0].value);
    }
  }

}
