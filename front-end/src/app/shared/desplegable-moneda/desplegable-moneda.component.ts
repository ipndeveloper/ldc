import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { DropdownComponent } from '../../core/shared/super/dropdown.component';
import { DesplegableMonedaService } from './desplegable-moneda.service';
import { Moneda } from '../data-models/moneda';

@Component({
  selector: 'yrd-desplegable-moneda',
  templateUrl: './desplegable-moneda.component.html',
  styleUrls: ['./desplegable-moneda.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: DesplegableMonedaComponent }
  ]
})
export class DesplegableMonedaComponent extends DropdownComponent<Moneda> {

  @Input() etiqueta = 'Ingrese etiqueta';
  @Input() control: FormControl;

  constructor(monedaService: DesplegableMonedaService) {
    super(monedaService);
  }
}
