import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-estado-movimiento',
  templateUrl: './estado-movimiento.component.html',
  styleUrls: ['./estado-movimiento.component.css']
})
export class EstadoMovimientoComponent {

  @Input() estadoMovimientoForm: FormGroup;

  constructor() { }
}



