import { Component, ViewChild, ElementRef } from '@angular/core';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { Caracteristica } from '../data-models/caracteristica';
import { CaracteristicaService } from './caracteristica.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-desplegable-caracteristica',
  templateUrl: './desplegable-caracteristica.component.html',
  styleUrls: ['./desplegable-caracteristica.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableCaracteristicaComponent }
  ]
})
export class DesplegableCaracteristicaComponent extends DropdownComponent<Caracteristica> {

@ViewChild('selectCaracteristica') select: ElementRef;

  constructor(caracteristicaService: CaracteristicaService) {
    super(caracteristicaService);
   }

   setFocus() {
    this.select.nativeElement.focus();
  }

}
