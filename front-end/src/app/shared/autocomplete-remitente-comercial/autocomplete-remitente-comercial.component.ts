import { Component, Input } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { RemitenteComercial } from '../data-models/remitente-comercial';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteRemitenteComercialService } from './autocomplete-remitente-comercial.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'yrd-autocomplete-remitente-comercial',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteRemitenteComercialComponent }
  ]
})
export class AutocompleteRemitenteComercialComponent extends AutocompleteComponent<RemitenteComercial> {
  @Input() etiqueta = 'Remitente Comercial';

  constructor(readonly service: AutocompleteRemitenteComercialService) {
    super();
  }

  getDataByFilter(filter: string): Observable<RemitenteComercial[]> {
    return this.service.getDataByFilter(filter);
  }
}
