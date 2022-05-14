import { Component, OnInit, Input, ViewChild, TemplateRef } from '@angular/core';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { ChecklistControlPatrimonial } from '../../../shared/data-models/checklist-control-patrimonial';

@Component({
  selector: 'yrd-lista-checklist-control-patrimonial',
  templateUrl: './lista-checklist-control-patrimonial.component.html',
  styleUrls: ['./lista-checklist-control-patrimonial.component.css']
})

export class ListaChecklistControlPatrimonialComponent
       implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('tableHeaderTemplate') tableHeaderTemplate: TemplateRef<any>;
  @ViewChild('tableCellTemplate') tableCellTemplate: TemplateRef<any>;
  @ViewChild('valorObservacionTemplate') valorObservacionTemplate: TemplateRef<any>;

  columns: any;
  rows: any;
  selectedRows: any = [];

  get checklistForm() {
    return this.form.get('checklist') as FormArray;
  }

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit() {
    this.setGridColumns();
  }

  onSelect(rows: any) {
    this.selectedRows = rows.selected;
    this.checklistForm.controls.forEach(checklist => {
      const observacionesControl = checklist.get('observaciones');
      const controladoControl = checklist.get('controlado');
      if (observacionesControl) {
        const checkSelected = this.selectedRows.find(sr => sr.value.IdControlPatrimonial === checklist.value.IdControlPatrimonial);
        if (checkSelected && !checkSelected.value.controlado) {
          observacionesControl.enable();
        } else {
          observacionesControl.disable();
          if (controladoControl && !controladoControl.value) {
            observacionesControl.patchValue(null);
          }
        }
      }
    });
  }

  deshabilitarControlesAprobados() {
    this.rows.forEach(checklist => {
      checklist.controls.observaciones.disable();
      if (checklist.controls.estaAprobado.value) {
        checklist.disable();
      }
    });
  }

  setChecklist(checklist: ChecklistControlPatrimonial[]): void {
    this.clearChecklistArray();
    checklist.forEach(cl => {
      this.checklistForm.push(this.buildChecklist(cl));
    });
    checklist = checklist.sort((n1, n2) => {
      if (n1.orden < n2.orden) { return 1; }
      if (n1.orden > n2.orden) { return -1; }
      return 0;
    });
    this.refreshGrid();
  }

  clearChecklistArray() {
    while (this.checklistForm.length !== 0) {
      this.checklistForm.removeAt(0);
    }
    this.refreshGrid();
  }

  setEnableChecklist(enable: boolean) {
    if (this.form) {
      enable ? this.form.enable() : this.form.disable();
    }
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
        width: 30,
        cellTemplate: this.valorObservacionTemplate,
      },
      {
        name: Resources.Labels.FechaHora,
        prop: 'value.fechaHora',
        width: 30
      },
      {
        name: Resources.Labels.Usuario,
        prop: 'value.usuario',
        width: 30
      }
    ];
  }

  private buildChecklist(value: ChecklistControlPatrimonial): FormGroup {
    const checklistFormGroup = this.fb.group({
      id: value.id,
      IdControlPatrimonial: value.idControlPatrimonial,
      estaAprobado: value.estaAprobado,
      descControl: value.descControl,
      observaciones: value.observaciones,
      fechaHora: value.fechaHora,
      usuario: value.usuario,
      orden: value.orden,
      controlado: value.estaAprobado
    });
    return checklistFormGroup;
  }

  private refreshGrid() {
    this.selectedRows = [];
    this.rows = [...this.checklistForm.controls];
  }

}
