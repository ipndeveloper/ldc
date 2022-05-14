import { Component } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Corredor } from '../data-models/corredor';
import { AutocompleteCorredorService } from './autocomplete-corredor.service';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-autocomplete-corredor',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteCorredorComponent }
  ]
})
export class AutocompleteCorredorComponent extends AutocompleteComponent<Corredor> {
  constructor(readonly service: AutocompleteCorredorService) {
    super();
    this.etiqueta = 'Corredor';
  }

  getDataByFilter(filter: string): Observable<Corredor[]> {
    return this.service.getDataByFilter(filter);
  }
}
