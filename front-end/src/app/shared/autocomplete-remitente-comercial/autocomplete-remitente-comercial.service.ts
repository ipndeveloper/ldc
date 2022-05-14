import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { RemitenteComercial } from '../data-models/remitente-comercial';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteRemitenteComercialService extends AutocompleteService<RemitenteComercial> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'remitentes-comerciales';
  }

  getDataByFilter(filter: string): Observable<RemitenteComercial[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
