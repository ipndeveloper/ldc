import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms/';
import { DropdownComponent } from '../../../../core/shared/super/dropdown.component';
import { ServicioAfipService } from '../servicio-afip.service';
import { ServicioAfip } from '../servicio-afip';

@Component({
  selector: 'yrd-desplegable-servicio-afip',
  templateUrl: './desplegable-servicio-afip.component.html',
  styleUrls: ['./desplegable-servicio-afip.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableServicioAfipComponent }
  ]
})
export class DesplegableServicioAfipComponent extends DropdownComponent<ServicioAfip> {

  @Input() control: FormControl;

  constructor(servicioAfipService: ServicioAfipService) {
    super(servicioAfipService);
  }
}
