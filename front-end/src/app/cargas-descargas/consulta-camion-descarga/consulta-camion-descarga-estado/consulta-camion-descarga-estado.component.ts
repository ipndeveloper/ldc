import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'yrd-consulta-camion-descarga-estado',
  templateUrl: './consulta-camion-descarga-estado.component.html',
  styleUrls: ['./consulta-camion-descarga-estado.component.css']
})

export class ConsultaCamionDescargaEstadoComponent {

  @Input() estadoMovimientoForm: FormGroup;

  constructor() {
  }
}
