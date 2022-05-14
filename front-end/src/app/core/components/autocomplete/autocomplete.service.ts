import { Injectable } from '@angular/core';
import { EntityWithDescription } from '../../models/entity-with-description';
import { ApiService } from '../../services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteService<T extends EntityWithDescription> {
  public apiRoute: string;

  constructor(protected readonly apiService: ApiService) {}

  public getDataByFilter(filter: string): Observable<T[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}

