import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { IntermediarioFlete } from '../data-models/intermediario-flete';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutocompleteIntermediarioFleteService extends AutocompleteService<IntermediarioFlete> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'intermediarios-flete';
  }
  getDataByFilter(filter: string): Observable<IntermediarioFlete[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
