import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Circuitos } from '../data-models/circuitos';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class DesplegableCircuitoService extends EntityService<Circuitos> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Circuitos[]> {
    return this.apiService.get<Circuitos[]>('circuitos/todos');
  }

  getAllHabilitados(): Observable<Circuitos[]> {
    return this.apiService.get<Circuitos[]>(`circuitos/todos?&Habilitado=true`);
  }

  getAllByPermiso(permiso: string, soloHabilitados: boolean): Observable<Circuitos[]> {
    let url = `circuitos/permiso?codigoPermiso=${permiso}`;
    if (soloHabilitados) {
      url += '&soloHabilitados=true';
    }
    return this.apiService.get<Circuitos[]>(url);
  }
}
