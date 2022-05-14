import { Component } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { MercadoTermino } from '../data-models/mercado-termino';
import { AutocompleteMercadoTerminoService } from './autocomplete-mercado-termino.service';
import { Observable } from 'rxjs';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';

@Component({
  selector: 'yrd-autocomplete-mercado-termino',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteMercadoTerminoComponent }
  ]
})
export class AutocompleteMercadoTerminoComponent extends AutocompleteComponent<MercadoTermino> {
  constructor(readonly service: AutocompleteMercadoTerminoService) {
    super();
    this.etiqueta = 'Mercado a Término';
  }

  getDataByFilter(filter: string): Observable<MercadoTermino[]> {
    return this.service.getDataByFilter(filter);
  }

}
