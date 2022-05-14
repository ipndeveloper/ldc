import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-destino-datos-documento',
  templateUrl: './destino-datos-documento.component.html',
  styleUrls: ['./destino-datos-documento.component.css']
})
export class DestinoDatosDocumentoComponent {

  @Input() form: FormGroup;

  constructor() { }

}
