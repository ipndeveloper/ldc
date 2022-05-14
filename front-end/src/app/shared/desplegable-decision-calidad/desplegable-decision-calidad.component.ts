import { Component, ElementRef, ViewChild } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DecisionCalidadService } from './decision-calidad.service';
import { DecisionCalidad } from '../data-models/decision-calidad';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-decision-calidad',
  templateUrl: './desplegable-decision-calidad.component.html',
  styleUrls: ['./desplegable-decision-calidad.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableDecisionCalidadComponent }
  ]
})
export class DesplegableDecisionCalidadComponent extends DropdownComponent<DecisionCalidad> {

  @ViewChild('selectDecision') select: ElementRef;

    constructor(desplegableActividadService: DecisionCalidadService) {
      super(desplegableActividadService);
    }
    setFocus() {
      this.select.nativeElement.focus();
    }
}
