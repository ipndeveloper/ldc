import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { EstadoTrabajoGeneracionArchivoMuestra } from '../data-models/estado-trabajo-generacion-archivo-muestra';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { EstadoTrabajoGeneracionArchivoMuestrasService } from './estado-trabajo-generacion-archivo-muestras.service';

@Component({
  selector: 'yrd-desplegable-trabajo-generacion-archivo-muestras',
  templateUrl: './desplegable-trabajo-generacion-archivo-muestras.component.html',
  styleUrls: ['./desplegable-trabajo-generacion-archivo-muestras.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTrabajoGeneracionArchivoMuestrasComponent }
  ]
})
export class DesplegableTrabajoGeneracionArchivoMuestrasComponent extends DropdownComponent<EstadoTrabajoGeneracionArchivoMuestra> {

  constructor(estadoTrabajoGeneracionArchivoMuestrasService: EstadoTrabajoGeneracionArchivoMuestrasService,
    dropdownNotificationService:  DropdownNotificationService<EstadoTrabajoGeneracionArchivoMuestra>) {
    super(estadoTrabajoGeneracionArchivoMuestrasService, dropdownNotificationService);
  }
}
