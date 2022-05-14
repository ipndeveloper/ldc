import { Component, Input } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Entregador } from '../data-models/entregador';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteEntregadorService } from './autocomplete-entregador.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'yrd-autocomplete-entregador',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteEntregadorComponent }
  ]
})

export class AutocompleteEntregadorComponent extends AutocompleteComponent<Entregador> {
  @Input() etiqueta = 'Entregador';
  constructor(readonly service: AutocompleteEntregadorService) {
    super();
  }
  getDataByFilter(filter: string): Observable<Entregador[]> {
    return this.service.getDataByFilter(filter);
  }
}
