import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormArray } from '@angular/forms';
import { MotivoNoDescarga } from './motivo-no-descarga';

@Component({
  selector: 'yrd-lista-motivos-no-descarga',
  templateUrl: './lista-motivos-no-descarga.component.html',
  styleUrls: ['./lista-motivos-no-descarga.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: ListaMotivosNoDescargaComponent }
  ]
})
export class ListaMotivosNoDescargaComponent {
  @Input() motivosForm: FormArray;

  constructor() {
  }

  protected map(objectToMap: any[]): MotivoNoDescarga[] {
    return objectToMap;
  }

  checkedChanged(i: number) {
    this.motivosForm.value[i].checked = !this.motivosForm.value[i].checked;
    this.motivosForm.updateValueAndValidity();
  }
}
