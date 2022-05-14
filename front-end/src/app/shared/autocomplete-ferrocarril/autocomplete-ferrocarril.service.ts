import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Ferrocarril } from '../data-models/ferrocarril';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteFerrocarrilService extends AutocompleteService<Ferrocarril> {
  constructor(protected apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'ferrocarriles';
  }

  public getDataByFilter(filter: string): Observable<Ferrocarril[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
