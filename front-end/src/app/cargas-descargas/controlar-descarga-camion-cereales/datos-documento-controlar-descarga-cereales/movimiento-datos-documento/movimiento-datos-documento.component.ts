import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-movimiento-datos-documento',
  templateUrl: './movimiento-datos-documento.component.html',
  styleUrls: ['./movimiento-datos-documento.component.css']
})
export class MovimientoDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;

  constructor() { }

}
