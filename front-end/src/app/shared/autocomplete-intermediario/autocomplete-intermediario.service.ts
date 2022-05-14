import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { Intermediario } from '../data-models/intermediario';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutocompleteIntermediarioService extends AutocompleteService<Intermediario> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'intermediarios';
  }
  getDataByFilter(filter: string): Observable<Intermediario[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
