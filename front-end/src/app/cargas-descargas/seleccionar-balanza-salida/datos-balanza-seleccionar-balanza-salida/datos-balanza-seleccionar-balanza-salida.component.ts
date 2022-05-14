import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-datos-balanza-seleccionar-balanza-salida',
  templateUrl: './datos-balanza-seleccionar-balanza-salida.component.html',
  styleUrls: ['./datos-balanza-seleccionar-balanza-salida.component.css']
})
export class DatosBalanzaSeleccionarBalanzaSalidaComponent implements OnInit {

  @Input() datosBalanzaForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
