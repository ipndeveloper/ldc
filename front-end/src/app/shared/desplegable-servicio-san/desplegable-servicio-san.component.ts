import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { ServicioSan } from '../data-models/servicio-san';
import { ServicioSanService } from './servicio-san.service';

@Component({
  selector: 'yrd-desplegable-servicio-san',
  templateUrl: './desplegable-servicio-san.component.html',
  styleUrls: ['./desplegable-servicio-san.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableServicioSanComponent }
  ]
})
export class DesplegableServicioSanComponent extends DropdownComponent<ServicioSan> {

  constructor(servicioSanService: ServicioSanService) {
    super(servicioSanService);
  }

}

