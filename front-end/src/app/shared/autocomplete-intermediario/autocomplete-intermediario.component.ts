import { Component } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Intermediario } from '../data-models/intermediario';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteIntermediarioService } from './autocomplete-intermediario.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'yrd-autocomplete-intermediario',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteIntermediarioComponent }
  ]
})
export class AutocompleteIntermediarioComponent extends AutocompleteComponent<Intermediario> {
  constructor(readonly service: AutocompleteIntermediarioService) {
    super();
    this.etiqueta = 'Intermediario';
  }
  getDataByFilter(filter: string): Observable<Intermediario[]> {
    return this.service.getDataByFilter(filter);
  }
}
