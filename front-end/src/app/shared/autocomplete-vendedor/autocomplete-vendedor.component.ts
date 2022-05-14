import { Component } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Observable } from 'rxjs';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteVendedorService } from './autocomplete-vendedor.service';
import { Sociedad } from '../data-models/sociedad';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Component({
  selector: 'yrd-autocomplete-vendedor',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteVendedorComponent }
  ]
})
export class AutocompleteVendedorComponent extends AutocompleteComponent<EntityWithDescription> {
  constructor(readonly service: AutocompleteVendedorService) {
    super();
    this.etiqueta = 'Vendedor';
  }

  getDataByFilter(filter: string): Observable<Sociedad[]> {
    return this.service.getDataByFilter(filter);
  }

}
