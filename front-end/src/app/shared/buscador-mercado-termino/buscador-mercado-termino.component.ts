import { Component, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormControl } from '@angular/forms';
import { MercadoTermino } from '../data-models/mercado-termino';
import { SearchComponent } from '../../core/shared/super/search.component';
import { MercadoTerminoService } from './mercado-termino.service';

@Component({
  selector: 'yrd-buscador-mercado-termino',
  templateUrl: './buscador-mercado-termino.component.html',
  styleUrls: ['./buscador-mercado-termino.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: BuscadorMercadoTerminoComponent }
  ]
})
export class BuscadorMercadoTerminoComponent extends SearchComponent<MercadoTermino> {

  @Input() control: FormControl;
  @Input() etiqueta = 'Mercado a Término';

  constructor(mercadoTerminoService: MercadoTerminoService) {
    super(mercadoTerminoService);
  }
}
