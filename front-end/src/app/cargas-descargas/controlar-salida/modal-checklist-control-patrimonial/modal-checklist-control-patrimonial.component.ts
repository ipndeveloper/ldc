import { Component, OnInit, ViewChild, Input, TemplateRef } from '@angular/core';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { ChecklistControlPatrimonial } from '../../../shared/data-models/checklist-control-patrimonial';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modal-checklist-control-patrimonial',
  templateUrl: './modal-checklist-control-patrimonial.component.html',
  styleUrls: ['./modal-checklist-control-patrimonial.component.css']
})
export class ModalChecklistControlPatrimonialComponent implements OnInit {

  @Input() labelHeader = 'Checklist control patrimonial';
  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('tableHeaderTemplate') tableHeaderTemplate: TemplateRef<any>;
  @ViewChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;
  form: FormGroup;
  columns: any;
  rows: any;

  get checklistForm() {
    return this.form.get('checklist') as FormArray;
  }

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      checklist: this.fb.array([])
    });
    this.setGridColumns();
  }

  onAccept() {
    this.modal.close();
  }

  open(checklist: ChecklistControlPatrimonial[]) {
    this.setChecklist(checklist);
    this.modal.open();
  }

  onClosing() {
    this.clearChecklistArray();
    this.form.reset();
  }

  private setChecklist(checklist: ChecklistControlPatrimonial[]): void {
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

  private buildChecklist(value: ChecklistControlPatrimonial): FormGroup {
    const checklistFormGroup = this.fb.group({
      estaAprobado: { value: value.estaAprobado, disabled: true },
      descControl: { value: value.descControl, disabled: true },
      observaciones: { value: value.observaciones, disabled: true },
      fechaHora: { value: value.fechaHora, disabled: true },
      usuario: { value: value.usuario, disabled: true }
    });
    return checklistFormGroup;
  }

  private refreshGrid() {
    this.rows = [...this.checklistForm.controls];
  }

  private setGridColumns() {
    this.columns = [
      {
        name: '',
        prop: 'value.estaAprobado',
        sortable: false,
        canAutoResize: false,
        draggable: false,
        resizable: false,
        cellTemplate: this.tableCellTemplate,
        width: 30,
      },
      {
        name: Resources.Labels.DescControl,
        prop: 'value.descControl',
      },
      {
        name: Resources.Labels.Observacion,
        prop: 'value.observaciones',
      },
      {
        name: Resources.Labels.FechaHora,
        prop: 'value.fechaHora',
      },
      {
        name: Resources.Labels.Usuario,
        prop: 'value.usuario',
      }
    ];
  }
}
