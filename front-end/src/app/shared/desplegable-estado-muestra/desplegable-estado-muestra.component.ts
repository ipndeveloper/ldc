import { Component } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EstadoMuestra } from '../data-models/estado-muestra';
import { EstadoMuestraService } from './estado-muestra.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';

@Component({
  selector: 'yrd-desplegable-estado-muestra',
  templateUrl: './desplegable-estado-muestra.component.html',
  styleUrls: ['./desplegable-estado-muestra.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoMuestraComponent }
  ]
})
export class DesplegableEstadoMuestraComponent extends DropdownComponent<EstadoMuestra> {

  constructor(estadoMuestraService: EstadoMuestraService,
    dropdownNotificationService:  DropdownNotificationService<EstadoMuestra>) {
    super(estadoMuestraService, dropdownNotificationService);
  }
}
