import { Component } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EstadoInterfazSan } from '../data-models/estado-interfaz-san';
import { EstadoInterfazSanService } from './estado-interfaz-san.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';

@Component({
  selector: 'yrd-desplegable-estado-interfaz-san',
  templateUrl: './desplegable-estado-interfaz-san.component.html',
  styleUrls: ['./desplegable-estado-interfaz-san.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoInterfazSanComponent }
  ]
})
export class DesplegableEstadoInterfazSanComponent  extends DropdownComponent<EstadoInterfazSan> {

  constructor(service: EstadoInterfazSanService,
              dropdownNotificationService: DropdownNotificationService<EstadoInterfazSan>) {
    super(service, dropdownNotificationService);
  }

}

