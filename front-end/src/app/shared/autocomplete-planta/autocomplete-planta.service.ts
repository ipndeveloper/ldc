import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Planta } from '../data-models/planta';

@Injectable({
  providedIn: 'root'
})
export class AutocompletePlantaService extends AutocompleteService<Planta> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = '/consultar-datos-afip/plantas';
  }

  getPlantas(cuit: number): Observable<Planta[]> {
    const url = `${this.apiRoute}?cuit=${cuit}`;

    return this.apiService.get<Array<Planta>>(url);
  }
}
