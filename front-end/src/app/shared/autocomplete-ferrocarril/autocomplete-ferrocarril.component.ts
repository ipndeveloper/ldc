import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteFerrocarrilService } from './autocomplete-ferrocarril.service';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Ferrocarril } from '../data-models/ferrocarril';

@Component({
  selector: 'yrd-autocomplete-ferrocarril',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteFerrocarrilComponent }
  ]
})
export class AutocompleteFerrocarrilComponent extends AutocompleteComponent<Ferrocarril> {

  constructor(protected FerrocarrilService: AutocompleteFerrocarrilService) {
    super();
  }

  getDataByFilter(term: string) {
    return this.FerrocarrilService.getDataByFilter(term);
  }
}
