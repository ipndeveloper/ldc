import { Injectable } from '@angular/core';
import { AutocompleteService } from '../../../core/components/autocomplete/autocomplete.service';
import { Sede } from '../../../shared/data-models/sede';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteSedeService extends AutocompleteService<Sede> {
  esOrigen: boolean;
  idVendedor: number | null;
  idFinalidad: number | null;
  idSedeOrigen: number | null;

  constructor(apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'sede';
  }

  getDataByFilter(filter: string): Observable<Sede[]> {
    let url = `${this.apiRoute}/autocomplete?descripcion=${filter}&EsSedeVendedor=${this.esOrigen}`;
    if (this.idFinalidad) {
      url += `&idFinalidad=${this.idFinalidad}`;
    }
    if (this.idVendedor) {
      url += `&idVendedor=${this.idVendedor}`;
    }
    if (this.idSedeOrigen) {
      url += `&idSedeOrigen=${this.idSedeOrigen}`;
    }
    return this.apiService.get(url);
  }
}
