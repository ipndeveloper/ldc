import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { BalanzaDashboard } from '../../../shared/data-models/balanza-dashboard';

@Component({
  selector: 'yrd-modal-seleccionar-balanzas',
  templateUrl: './modal-seleccionar-balanzas.component.html',
  styleUrls: ['./modal-seleccionar-balanzas.component.css']
})
export class ModalSeleccionarBalanzasComponent implements OnInit {
  @Input() labelHeader = 'Seleccionar balanzas';
  @Output() accepted = new EventEmitter();
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('tableHeaderTemplate') tableHeaderTemplate: TemplateRef<any>;
  @ViewChild('selectCellTemplate') selectCellTemplate: TemplateRef<any>;
  @Input() form: FormGroup;
  columns: any;
  rows: any;
  balanzasSeleccionadas: number[];

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.form = this.fb.group({
      checklist: this.fb.array([])
    });
    this.setGridColumns();
  }

  get checklistForm() {
    return this.form.get('checklist') as FormArray;
  }

  open(checklist: BalanzaDashboard[]) {
    this.setChecklist(checklist);
    this.modal.open();
  }

  private setChecklist(checklist: BalanzaDashboard[]): void {
    this.clearChecklistArray();
    checklist.forEach(cl => {
      this.checklistForm.push(this.buildChecklist(cl));
    });
    this.refreshGrid();
  }

  private clearChecklistArray() {
    while (this.checklistForm.length !== 0) {
      this.checklistForm.removeAt(0);
    }
    this.refreshGrid();
  }

  onClosing() {
    this.clearChecklistArray();
    this.form.reset();
  }

  onAccept() {
    this.accepted.emit();
  }

  close() {
    this.modal.close();
  }

  private buildChecklist(value: BalanzaDashboard): FormGroup {
    const checklistFormGroup = this.fb.group({
      id: { value: value.id, disabled: false },
      descripcion: { value: `${value.terminal} - ${value.nombre} - ${value.sentidoBalanza}`, disabled: false },
      seleccionada: { value: value.seleccionadaDefault, disabled: false },
    });
    return checklistFormGroup;
  }

  private refreshGrid() {
    this.rows = [...this.checklistForm.controls];
  }

  private setGridColumns() {
    this.columns = [
      {
        prop: 'value.seleccionada',
        name: '',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.selectCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.BalanzasAutomatizadas,
        prop: 'value.descripcion',
      },
    ];
  }
}
