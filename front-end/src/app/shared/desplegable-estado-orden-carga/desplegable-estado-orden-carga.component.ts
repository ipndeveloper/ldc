import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DesplegableEstadoOrdenCargaService } from './desplegable-estado-orden-carga.service';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EstadoOrdenCarga } from '../data-models/estado-orden-carga';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-estado-orden-carga',
  templateUrl: './desplegable-estado-orden-carga.component.html',
  styleUrls: ['./desplegable-estado-orden-carga.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoOrdenCargaComponent }
  ]
})

export class DesplegableEstadoOrdenCargaComponent extends DropdownComponent<EstadoOrdenCarga>
 implements OnInit {

  @ViewChild('selectEstadoOrdenCarga') selectEstadoOrdenCarga: ElementRef;

  constructor(desplegableEstadoOrdenCargaService: DesplegableEstadoOrdenCargaService) {
    super(desplegableEstadoOrdenCargaService);
  }

}
