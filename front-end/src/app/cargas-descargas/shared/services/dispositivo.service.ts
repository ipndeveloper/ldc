import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ModoAccionDataView } from '../../../shared/data-models/modo-accion-data-view';
import { DispositivoDataView } from '../../../shared/data-models/dispositivo-data-view';

@Injectable({
  providedIn: 'root'
})

export class DispositivoService {

  private readonly apiUrl = 'dispositivos/actual';

  constructor(private readonly apiService: ApiService) { }

  public consultarAccion(idAccion: number): Observable<ModoAccionDataView> {
    return this.apiService.get<ModoAccionDataView>(`${this.apiUrl}/consultar-accion?IdAccion=${idAccion}`);
  }

  public consultarTiposDispositivos(idsTiposDispositivo: number[]): Observable<DispositivoDataView[]> {
    let query = this.apiUrl + '/dispositivos-por-tipo?';

    idsTiposDispositivo.forEach(value => query += 'idsTiposDispositivo=' + value + '&');
    return this.apiService.get<DispositivoDataView[]>(query);
  }
}
