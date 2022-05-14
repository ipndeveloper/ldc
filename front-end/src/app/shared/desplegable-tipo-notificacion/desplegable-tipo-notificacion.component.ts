import { Component } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TipoNotificacion } from '../data-models/tipo-notificacion';
import { TipoNotificacionService } from './tipo-notificacion.service';

@Component({
  selector: 'yrd-desplegable-tipo-notificacion',
  templateUrl: './desplegable-tipo-notificacion.component.html',
  styleUrls: ['./desplegable-tipo-notificacion.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoNotificacionComponent }
  ]
})
export class DesplegableTipoNotificacionComponent extends DropdownComponent<TipoNotificacion> {

  constructor(service: TipoNotificacionService) {
    super(service);
  }

}
