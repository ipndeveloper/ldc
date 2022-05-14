import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { MotivoErrorBalanzaPorCircuitoDataView } from '../data-models/motivo-error-balanza-por-circuito-data-view';

@Injectable({
  providedIn: 'root'
})
export class DesplegableMotivoErrorBalanzaCircuitoService extends EntityService<MotivoErrorBalanzaPorCircuitoDataView> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAllByCircuito(idCircuito: number, esEntrada: boolean): Observable<MotivoErrorBalanzaPorCircuitoDataView[]> {
    return this.apiService.get(`circuitos/motivos-error?idCircuito=${idCircuito}&esEntrada=${esEntrada}`);
  }
}
