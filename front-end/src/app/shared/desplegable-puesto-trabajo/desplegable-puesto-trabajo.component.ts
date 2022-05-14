import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { PuestoTrabajoService } from './puesto-trabajo.service';
import { PuestoTrabajo } from '../data-models/puesto-trabajo';

@Component({
  selector: 'yrd-desplegable-puesto-trabajo',
  templateUrl: './desplegable-puesto-trabajo.component.html',
  styleUrls: ['./desplegable-puesto-trabajo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegablePuestoTrabajoComponent }
  ]
})
export class DesplegablePuestoTrabajoComponent extends DropdownComponent<PuestoTrabajo> {

  @ViewChild('selectPuestoTrabajo') select: ElementRef;
  @Input() control: FormControl;
  constructor(puestoTrabajoService: PuestoTrabajoService) {
    super(puestoTrabajoService);
   }

  setFocus() {
    this.select.nativeElement.focus();
  }

}
