import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { TipoPuestoTrabajo } from '../data-models/tipo-puesto-trabajo';
import { TipoPuestoTrabajoService } from './desplegable-tipo-puesto-trabajo.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-tipo-puesto-trabajo',
  templateUrl: './desplegable-tipo-puesto-trabajo.component.html',
  styleUrls: ['./desplegable-tipo-puesto-trabajo.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableTipoPuestoTrabajoComponent }
  ]
})

export class DesplegableTipoPuestoTrabajoComponent extends DropdownComponent<TipoPuestoTrabajo>
 implements OnInit {

  @ViewChild('selectTipoPuestoTrabajo') select: ElementRef;

  constructor(tipoPuestoTrabajoService: TipoPuestoTrabajoService) {
    super(tipoPuestoTrabajoService);
  }

  setFocus() {
    this.select.nativeElement.focus();
  }
}

