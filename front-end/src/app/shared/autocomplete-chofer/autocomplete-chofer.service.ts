import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { Chofer } from '../data-models/chofer';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteChoferService extends AutocompleteService<Chofer> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'choferes';
  }

  getDataByFilter(filter: string): Observable<Chofer[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
