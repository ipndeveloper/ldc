import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { PuntoCarga } from '../data-models/punto-carga';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegablePuntoCargaService } from './desplegable-punto-carga.service';

@Component({
  selector: 'yrd-desplegable-punto-carga',
  templateUrl: './desplegable-punto-carga.component.html',
  styleUrls: ['./desplegable-punto-carga.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegablePuntoCargaComponent }
  ]
})
export class DesplegablePuntoCargaComponent extends DropdownComponent<PuntoCarga> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;
  @ViewChild('selectPuntoCarga') selectPuntoCarga: ElementRef;

  constructor(puntoCargaService: DesplegablePuntoCargaService) {
    super(puntoCargaService);
  }

  setFocus() {
    this.selectPuntoCarga.nativeElement.focus();
  }
}
