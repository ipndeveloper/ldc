import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { EstadoViaje } from '../data-models/estado-viaje';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DesplegableEstadoViajeService } from './desplegable-estado-viaje.service';

@Component({
  selector: 'yrd-desplegable-estado-viaje',
  templateUrl: './desplegable-estado-viaje.component.html',
  styleUrls: ['./desplegable-estado-viaje.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoViajeComponent }
  ]
})

export class DesplegableEstadoViajeComponent extends DropdownComponent<EstadoViaje>
 implements OnInit {

  @ViewChild('selectEstadoViaje') selectEstadoViaje: ElementRef;

  constructor(desplegableEstadoViajeService: DesplegableEstadoViajeService) {
    super(desplegableEstadoViajeService);
  }

}

