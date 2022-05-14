import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Dispositivo } from '../data-models/dispositivo';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Injectable({
  providedIn: 'root'
})

export class DesplegableDispositivoService extends EntityService<Dispositivo> {

  readonly apiRoute = 'dispositivos';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Dispositivo[]> {
    return this.apiService.get<Dispositivo[]>(this.apiRoute);
  }

  getAllByTipo(idTipoDispositivo: number): Observable<Dispositivo[]> {
    return this.apiService.get<Dispositivo[]>(`${this.apiRoute}/tipo-dispositivo/${idTipoDispositivo}`);
  }

  getByTerminalTipo(idTerminal: number, tipoDispositivo: EntityWithDescription | null): Observable<Dispositivo[]> {
    let apiRoute = `${this.apiRoute}/desplegable?idTerminal=${idTerminal}`;

    if (tipoDispositivo) {
      apiRoute += `&idTipoDispositivo=${tipoDispositivo.id}`;
    }

    return this.apiService.get<Dispositivo[]>(apiRoute);
  }
}
