import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { Entregador } from '../data-models/entregador';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutocompleteEntregadorService extends AutocompleteService<Entregador> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'entregadores';
  }
  getDataByFilter(filter: string): Observable<Entregador[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
