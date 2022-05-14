import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { AdministrarTarjetaAutorizacionDataView } from '../../shared/data-models/administrar-tarjeta-autorizacion-data-view';
import { TarjetaAutorizacionCommand, CrearTarjetaAutorizacionCommand, ModificarTarjetaAutorizacionCommand } from '../../shared/data-models/commands/cargas-descargas/tarjeta-autorizacion-command';

@Injectable({
  providedIn: 'root'
})
export class AdministrarTarjetaAutorizacionService
     extends AdministrableFormService<AdministrarTarjetaAutorizacionDataView[],
                                      TarjetaAutorizacionCommand,
                                      CrearTarjetaAutorizacionCommand,
                                      ModificarTarjetaAutorizacionCommand,
                                      AdministrarTarjetaAutorizacionDataView> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'tarjetas/autorizacion';
  }

  getData(filters: Dictionary<string>): Observable<AdministrarTarjetaAutorizacionDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'numero');
    query += this.getQuerystringParameter(filters, 'habilitada');
    query += this.getQuerystringParameter(filters, 'usuario');

    return this.apiService.get(query);
  }

  validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    return filters ? true : false;
  }

  create(command: CrearTarjetaAutorizacionCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  update(command: ModificarTarjetaAutorizacionCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  getTipoTarjetaPorTerminal(idTerminal: number): Observable<EntityWithDescription> {
    return this.apiService.get(`terminales/tipo-tarjeta?id=${idTerminal}`);
  }
}
