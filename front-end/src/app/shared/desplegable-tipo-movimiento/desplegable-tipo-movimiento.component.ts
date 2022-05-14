import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoMovimiento } from '../data-models/tipo-movimiento';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { TipoMovimientoService } from './tipo-movimiento.service';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { map } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-desplegable-tipo-movimiento',
  templateUrl: './desplegable-tipo-movimiento.component.html',
  styleUrls: ['./desplegable-tipo-movimiento.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoMovimientoComponent }
  ]
})
export class DesplegableTipoMovimientoComponent
  extends DropdownComponent<TipoMovimiento> {

  @Input() opcionTodos = false;
  @ViewChild('selectTipoMovimiento') selectTipoMovimiento: ElementRef;
  constructor(protected readonly tipoMovimientoService: TipoMovimientoService,
              protected readonly dropdownNotificationService: DropdownNotificationService<TipoMovimiento>) {
    super(tipoMovimientoService, dropdownNotificationService);
  }

  protected getData() {
    return this.entityService.getAll().pipe(
      map((datos: TipoMovimiento[]) => {
        if (this.opcionTodos) {
          datos.unshift({'descripcion': Resources.Labels.Todos, 'id': -1});
        }
        return datos;
      }));
  }

  setFocus(): void {
    this.selectTipoMovimiento.nativeElement.focus();
  }

}
