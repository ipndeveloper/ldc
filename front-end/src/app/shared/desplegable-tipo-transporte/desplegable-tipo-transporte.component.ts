import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';

import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoTransporteService } from './desplegable-tipo-transporte.service';
import { TipoTransporte } from '../data-models/tipo-transporte';
import { DropdownNotificationService } from '../../core/shared/super/dropdown-notification.service';
import { map } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-desplegable-tipo-transporte',
  templateUrl: './desplegable-tipo-transporte.component.html',
  styleUrls: ['./desplegable-tipo-transporte.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoTransporteComponent }
  ]
})
export class DesplegableTipoTransporteComponent extends DropdownComponent<TipoTransporte> {

  @Input() control: FormControl;
  @Input() isFocused = false;
  @Input() opcionTodos = false;
  @Input() soloCamionYTren = false;
  @ViewChild('selectTipoTransporte') selectTipoTransporteElement: ElementRef;

  constructor(protected tipoTransporteService: TipoTransporteService,
    dropdownNotificationService: DropdownNotificationService<TipoTransporte>) {
    super(tipoTransporteService, dropdownNotificationService);
  }

  protected getData() {
    return this.tipoTransporteService.getAll(this.soloCamionYTren).pipe(
      map((datos: TipoTransporte[]) => {
        if (this.opcionTodos) {
          datos.unshift({'descripcion': Resources.Labels.Todos, 'id': -1});
        }
        return datos;
      }));
  }
}
