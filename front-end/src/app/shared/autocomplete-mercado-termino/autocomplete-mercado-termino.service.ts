import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { Observable } from 'rxjs';
import { MercadoTermino } from '../data-models/mercado-termino';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteMercadoTerminoService extends AutocompleteService<MercadoTermino> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'mercado-termino';
  }

  getDataByFilter(filter: string): Observable<MercadoTermino[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
