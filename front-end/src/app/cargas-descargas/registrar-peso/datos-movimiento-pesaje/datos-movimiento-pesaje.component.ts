import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-datos-movimiento-pesaje',
  templateUrl: './datos-movimiento-pesaje.component.html',
  styleUrls: ['./datos-movimiento-pesaje.component.css']
})
export class DatosMovimientoPesajeComponent {
  @Input() datosMovimientoForm: FormGroup;
  @Input() esFueraCircuito: boolean;
  @Input() esCarga: boolean;

  constructor() {
  }
}
