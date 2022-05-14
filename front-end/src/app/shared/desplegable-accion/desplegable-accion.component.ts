import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Accion } from '../data-models/accion';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DesplegableAccionService } from './desplegable-accion.service';

@Component({
  selector: 'yrd-desplegable-accion',
  templateUrl: './desplegable-accion.component.html',
  styleUrls: ['./desplegable-accion.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableAccionComponent }
  ]
})

export class DesplegableAccionComponent extends DropdownComponent<Accion>
 implements OnInit {

  @ViewChild('selectAccion') select: ElementRef;

  constructor(desplegableAccionService: DesplegableAccionService) {
    super(desplegableAccionService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}

