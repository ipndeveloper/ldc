import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../core/components/autocomplete/autocomplete.service';
import { Destinatario } from '../data-models/destinatario';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AutocompleteDestinatarioService extends AutocompleteService<Destinatario> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'destinatarios';
  }
  getDataByFilter(filter: string): Observable<Destinatario[]> {
    return this.apiService.get(`${this.apiRoute}/autocomplete/${filter}`);
  }
}
