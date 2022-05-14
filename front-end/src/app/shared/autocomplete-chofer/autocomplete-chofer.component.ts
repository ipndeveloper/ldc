import { Component } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Chofer } from '../data-models/chofer';
import { Observable } from 'rxjs';
import { AutocompleteChoferService } from './autocomplete-chofer.service';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'yrd-autocomplete-chofer',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteChoferComponent }
  ]
})
export class AutocompleteChoferComponent extends AutocompleteComponent<Chofer> {
  constructor(readonly service: AutocompleteChoferService) {
    super();
    this.etiqueta = 'Chofer';
  }

  getDataByFilter(filter: string): Observable<Chofer[]> {
    return this.service.getDataByFilter(filter);
  }
}
