import { Component, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-circuito',
  templateUrl: './circuito.component.html',
  styleUrls: ['./circuito.component.css']
})
export class CircuitoComponent implements OnChanges {

  @Input() circuitoForm: FormGroup;
  @Input() completarTipoProducto: boolean;
  @Input() permiteSeleccion = false;
  @Input() subproductos = false;
  @Input() insumosVarios = false;
  @Input() conCupo = false;
  @Input() seleccionaPrimeraOpcion = true;

  constructor() { }

  ngOnChanges() {
  }
}
