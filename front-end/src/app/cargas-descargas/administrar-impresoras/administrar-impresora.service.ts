import { Injectable } from '@angular/core';
import { AdministrarImpresorasDataView } from '../../shared/data-models/administrar-impresoras-data-view';
import { ImpresoraCommand, CrearImpresoraCommand, ModificarImpresoraCommand } from '../../shared/data-models/commands/cargas-descargas/impresora-command';
import { ImpresoraDataView } from '../../shared/data-models/impresora-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministrarImpresoraService extends AdministrableFormService<AdministrarImpresorasDataView[],
                                                                         ImpresoraCommand,
                                                                         CrearImpresoraCommand,
                                                                         ModificarImpresoraCommand,
                                                                         ImpresoraDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'impresoras';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarImpresorasDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarImpresorasDataView[]>(query);
  }

  get(id: number): Observable<ImpresoraDataView> {
    return this.apiService.get<ImpresoraDataView>(`${this.apiRoute}/${id}`);
  }
}
