import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegableMedioDePagoService } from './desplegable-medio-de-pago.service';
import { MedioDePago } from '../data-models/medio-de-pago';

@Component({
  selector: 'yrd-desplegable-medio-de-pago',
  templateUrl: './desplegable-medio-de-pago.component.html',
  styleUrls: ['./desplegable-medio-de-pago.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableMedioDePagoComponent }
  ]
})

export class DesplegableMedioDePagoComponent extends DropdownComponent<MedioDePago> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;

  constructor(medioDePagoService: DesplegableMedioDePagoService) {
    super(medioDePagoService);
  }
}
