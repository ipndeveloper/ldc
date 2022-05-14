import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarTiempoLimiteEstadoDataView } from '../../shared/data-models/administrar-tiempo-limite-estado-data-view';
import { TiempoLimiteEstadoCommand, CrearTiempoLimiteEstadoCommand, ModificarTiempoLimiteEstadoCommand } from '../../shared/data-models/commands/cargas-descargas/tiempo-limite-estado-command';
import { TiempoLimiteEstadoDataView } from '../../shared/data-models/tiempo-limite-estado-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarTiempoLimiteEstadoService
     extends AdministrableFormService<AdministrarTiempoLimiteEstadoDataView[],
                                      TiempoLimiteEstadoCommand,
                                      CrearTiempoLimiteEstadoCommand,
                                      ModificarTiempoLimiteEstadoCommand,
                                      TiempoLimiteEstadoDataView> {

  constructor(private readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'tiempo-limite-estado';
  }

  validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    return filters ? true : false;
  }

  getData(filters: Dictionary<string>): Observable<AdministrarTiempoLimiteEstadoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'estado', 'idEstado');
    query += this.getQuerystringParameter(filters, 'tiempoLimite');

    return this.apiService.get(query);
  }

  get(id: number): Observable<TiempoLimiteEstadoDataView> {
    return this.apiService.get(`${this.apiRoute}/${id}`);
  }

  create(command: CrearTiempoLimiteEstadoCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  update(command: ModificarTiempoLimiteEstadoCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  delete(id: number): Observable<object> {
    return this.apiService.put(this.apiRoute, id);
  }
}
