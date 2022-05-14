import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';
import { AdministrarEventoDataView } from '../../shared/data-models/adminstrar-evento-data-view';
import { CrearEventoCommand, EventoCommand, ModificarEventoCommand } from '../../shared/data-models/commands/cargas-descargas/evento-command';
import { EventoDataView } from '../../shared/data-models/evento-data-view';

@Injectable({
    providedIn: 'root'
  })
export class AdministrarEventoService
    extends AdministrableFormService<AdministrarEventoDataView[],
                                    EventoCommand,
                                    CrearEventoCommand,
                                    ModificarEventoCommand,
                                    EventoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'eventos';
  }
  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarEventoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'tipoEvento', 'idTipoEvento');
    query += this.getQuerystringParameter(filters, 'requiereAccion');
    query += this.getQuerystringParameter(filters, 'mensajeDashboard');

    return this.apiService.get<AdministrarEventoDataView[]>(query);
  }

}
