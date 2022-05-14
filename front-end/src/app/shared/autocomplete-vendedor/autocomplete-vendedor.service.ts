import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Sociedad } from '../data-models/sociedad';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteVendedorService extends AutocompleteService<Sociedad> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'vendedores';
  }

  getDataByFilter(filter: string): Observable<Sociedad[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
