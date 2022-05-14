import { Component, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Actividad } from '../data-models/actividad';
import { DesplegableActividadService } from './desplegable-actividad.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-actividad',
  templateUrl: './desplegable-actividad.component.html',
  styleUrls: ['./desplegable-actividad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableActividadComponent }
  ]
})
export class DesplegableActividadComponent extends DropdownComponent<Actividad> {

@ViewChild('selectActividad') select: ElementRef;

  constructor(desplegableActividadService: DesplegableActividadService) {
    super(desplegableActividadService);
  }
  setFocus() {
    this.select.nativeElement.focus();
  }
}
