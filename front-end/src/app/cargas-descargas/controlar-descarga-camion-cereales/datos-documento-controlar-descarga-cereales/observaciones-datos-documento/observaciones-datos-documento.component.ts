import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-observaciones-datos-documento',
  templateUrl: './observaciones-datos-documento.component.html',
  styleUrls: ['./observaciones-datos-documento.component.css']
})
export class ObservacionesDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Output() blurObservaciones: EventEmitter<any> = new EventEmitter();

  validationMessagesObservaciones = {
    maxlength: 'Debe ingresar menos de 250 caracteres'
  };

  constructor() { }

  setFocoAceptarYContinuar() {
    this.blurObservaciones.emit();
  }

}
