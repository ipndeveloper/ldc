import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { PermisoPadreHijoDataView } from '../data-models/permiso-data-view';
import { FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DesplegablePermisoService } from './desplegable-permiso.service';

@Component({
  selector: 'yrd-desplegable-permiso',
  templateUrl: './desplegable-permiso.component.html',
  styleUrls: ['./desplegable-permiso.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegablePermisoComponent }
  ]
})
export class DesplegablePermisoComponent extends DropdownComponent<PermisoPadreHijoDataView> {

  @ViewChild('selectPermiso') select: ElementRef;
  @Input() control: FormControl;
  constructor(permisoService: DesplegablePermisoService) {
    super(permisoService);
   }

  setFocus() {
    this.select.nativeElement.focus();
  }
}
