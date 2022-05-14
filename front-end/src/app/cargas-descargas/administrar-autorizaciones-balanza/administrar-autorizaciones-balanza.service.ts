import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarAutorizacionesBalanzaDataView } from '../../shared/data-models/administrar-autorizaciones-balanza-data-view';
import { AutorizacionBalanzaCommand, CrearAutorizacionBalanzaCommand, ModificarAutorizacionBalanzaCommand } from '../../shared/data-models/commands/cargas-descargas/autorizacion-balanza-command';
import { AutorizacionBalanzaDataView } from '../../shared/data-models/autorizacion-balanza-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarAutorizacionesBalanzaService
     extends AdministrableFormService<AdministrarAutorizacionesBalanzaDataView[],
                                      AutorizacionBalanzaCommand,
                                      CrearAutorizacionBalanzaCommand,
                                      ModificarAutorizacionBalanzaCommand,
                                      AutorizacionBalanzaDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'rangos-motivo-error-balanza';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarAutorizacionesBalanzaDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'circuito', 'idCircuito');
    query += this.getQuerystringParameter(filters, 'motivo', 'idMotivo');
    query += this.getQuerystringParameter(filters, 'esEntrada');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarAutorizacionesBalanzaDataView[]>(query);
  }
}
