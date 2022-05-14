import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { EstadoMovimiento } from '../data-models/estado-movimiento';
import { EstadoMovimientoService } from './estado-movimiento.service';
import { Observable } from 'rxjs';
import { DesplegableEstadoMovimientoFilter } from './desplegable-estado-movimiento-filter';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';

@Component({
  selector: 'yrd-desplegable-estado-movimiento',
  templateUrl: './desplegable-estado-movimiento.component.html',
  styleUrls: ['./desplegable-estado-movimiento.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableEstadoMovimientoComponent }
  ]
})
export class DesplegableEstadoMovimientoComponent extends DropdownComponent<EstadoMovimiento> {

  // @Input() filters: DesplegableEstadoMovimientoFilter;
  @Input() etiqueta = 'Estado';
  @Input() mostrarEtiqueta = true;
  @ViewChild('selectEstadoMovimiento') select: ElementRef;

  private _filters: DesplegableEstadoMovimientoFilter;
  @Input()
  set filters(val: DesplegableEstadoMovimientoFilter) {
    this._filters = val;
    this.databind();
  }

  constructor(private readonly estadoMovimientoService: EstadoMovimientoService,
              dropdownNotificationService:  DropdownNotificationService<EstadoMovimiento>) {
    super(estadoMovimientoService, dropdownNotificationService);
  }

  getData(): Observable<EstadoMovimiento[]> {
    if (!this._filters) {
      return this.estadoMovimientoService.getAll();
    } else {
      return this.estadoMovimientoService.getEstadosMovimientoByIdByIdsActividad(
        this._filters.idTipoMovimiento,
        this._filters.idsActividad,
        this._filters.traeEstadosNoFinales
      );
    }
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
