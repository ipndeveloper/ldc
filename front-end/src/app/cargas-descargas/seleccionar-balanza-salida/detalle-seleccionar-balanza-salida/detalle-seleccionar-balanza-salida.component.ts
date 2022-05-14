import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BABalanzasDisponiblesDataView } from '../../../shared/data-models/ba-balanzas-disponibles-data-view';

@Component({
  selector: 'yrd-detalle-seleccionar-balanza-salida',
  templateUrl: './detalle-seleccionar-balanza-salida.component.html',
  styleUrls: ['./detalle-seleccionar-balanza-salida.component.css']
})
export class DetalleSeleccionarBalanzaSalidaComponent {

  @Input() detalleForm: FormGroup;
  @Input() balanzasDisponibles: BABalanzasDisponiblesDataView[];

  constructor() { }

}
