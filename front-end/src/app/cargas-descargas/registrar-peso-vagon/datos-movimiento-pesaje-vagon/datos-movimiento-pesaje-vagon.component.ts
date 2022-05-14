import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-datos-movimiento-pesaje-vagon',
  templateUrl: './datos-movimiento-pesaje-vagon.component.html',
  styleUrls: ['./datos-movimiento-pesaje-vagon.component.css']
})
export class DatosMovimientoPesajeVagonComponent implements OnInit {

  @Input() datosMovimientoForm: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
