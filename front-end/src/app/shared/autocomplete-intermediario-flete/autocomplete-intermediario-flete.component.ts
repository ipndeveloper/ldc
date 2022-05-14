import { Component } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { IntermediarioFlete } from '../data-models/intermediario-flete';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteIntermediarioFleteService } from './autocomplete-intermediario-flete.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'yrd-autocomplete-intermediario-flete',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteIntermediarioFleteComponent }
  ]
})
export class AutocompleteIntermediarioFleteComponent extends AutocompleteComponent<IntermediarioFlete> {
  constructor(readonly service: AutocompleteIntermediarioFleteService) {
    super();
    this.etiqueta = 'Intermediario del Flete';
  }
  getDataByFilter(filter: string): Observable<IntermediarioFlete[]> {
    return this.service.getDataByFilter(filter);
  }
}
