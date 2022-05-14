import { Component } from '@angular/core';
import { MotivoEstadoMovimiento } from '../data-models/motivo-estado-movimiento';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { MotivoEstadoMovimientoService } from './motivo-estado-movimiento.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-motivo-estado-movimiento',
  templateUrl: './desplegable-motivo-estado-movimiento.component.html',
  styleUrls: ['./desplegable-motivo-estado-movimiento.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableMotivoEstadoMovimientoComponent }
  ]
})
export class DesplegableMotivoEstadoMovimientoComponent extends DropdownComponent<MotivoEstadoMovimiento> {

  constructor(motivoEstadoMovimientoService: MotivoEstadoMovimientoService) {
    super(motivoEstadoMovimientoService);
  }
}
