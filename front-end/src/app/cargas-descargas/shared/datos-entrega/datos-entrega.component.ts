import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-datos-entrega',
  templateUrl: './datos-entrega.component.html',
  styleUrls: ['./datos-entrega.component.css']
})
export class DatosEntregaComponent {

  @Input() datosEntrega: FormGroup;

  constructor() { }

}
