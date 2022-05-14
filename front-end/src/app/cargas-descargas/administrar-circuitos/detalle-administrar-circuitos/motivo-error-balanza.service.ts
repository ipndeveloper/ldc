import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MotivoErrorBalanzaService {

  apiUrl = '/motivo-error-balanza';

  constructor(private readonly api: ApiService) { }

  getAllByTipoMovimientoYTipoTransporte(idTipoMovimiento: number, idTipoTransporte: number, esEntrada: boolean): Observable<any[]> {
    const params = `idTipoMovimiento=${idTipoMovimiento}&idTipoTransporte=${idTipoTransporte}`;
    if (esEntrada) {
      return this.api.get(`${this.apiUrl}/entrada?${params}`);
    } else {
      return this.api.get(`${this.apiUrl}/salida?${params}`);
    }
  }
}
