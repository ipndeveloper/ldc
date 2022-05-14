import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Corredor } from '../data-models/corredor';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteCorredorService extends AutocompleteService<Corredor> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'corredores';
  }

  getDataByFilter(filter: string): Observable<Corredor[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
