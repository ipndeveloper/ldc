import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarDispositivosDataView } from '../../shared/data-models/administrar-dispositivos-data-view';
import { DispositivoDataView } from '../../shared/data-models/dispositivo-data-view';
import { ModificarDispositivoCommand, CrearDispositivoCommand, DispositivoCommand } from '../../shared/data-models/commands/cargas-descargas/dispositivo-command';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarDispositivoService extends AdministrableFormService<AdministrarDispositivosDataView[],
                                                                         DispositivoCommand,
                                                                         CrearDispositivoCommand,
                                                                         ModificarDispositivoCommand,
                                                                         DispositivoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'dispositivos';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarDispositivosDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'tipoDispositivo', 'idTipoDispositivo');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarDispositivosDataView[]>(query);
  }

  get(id: number): Observable<DispositivoDataView> {
    return this.apiService.get<DispositivoDataView>(`${this.apiRoute}/${id}`);
  }
}
