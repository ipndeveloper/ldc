import { Component } from '@angular/core';
import { AutocompleteComponent } from '../../core/components/autocomplete/autocomplete.component';
import { Destinatario } from '../data-models/destinatario';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { AutocompleteDestinatarioService } from './autocomplete-destinatario.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'yrd-autocomplete-destinatario',
  templateUrl: './../../core/components/autocomplete/autocomplete.component.html',
  styleUrls: ['./../../core/components/autocomplete/autocomplete.component.css'],
  providers: [
    { provide: NG_VALUE_ACCESSOR, multi: true, useExisting: AutocompleteDestinatarioComponent }
  ]
})
export class AutocompleteDestinatarioComponent extends AutocompleteComponent<Destinatario> {
  constructor(readonly service: AutocompleteDestinatarioService) {
    super();
    this.etiqueta = 'Destinatario';
  }
  getDataByFilter(filter: string): Observable<Destinatario[]> {
    return this.service.getDataByFilter(filter);
  }
}
