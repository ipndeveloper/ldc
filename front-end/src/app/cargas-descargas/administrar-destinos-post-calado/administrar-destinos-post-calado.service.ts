import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarDestinoPostCaladoDataView } from '../../shared/data-models/administrar-destinos-post-calado-data-view';
import { DestinoPostCaladoCommand, CrearDestinoPostCaladoCommand, ModificarDestinoPostCaladoCommand } from '../../shared/data-models/commands/cargas-descargas/destino-post-calado-command';
import { DestinoPostCaladoDataView } from '../../shared/data-models/destino-post-calado-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministrarDestinosPostCaladoService
  extends AdministrableFormService<Array<AdministrarDestinoPostCaladoDataView>,
                                   DestinoPostCaladoCommand,
                                   CrearDestinoPostCaladoCommand,
                                   ModificarDestinoPostCaladoCommand,
                                   DestinoPostCaladoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'ubicaciones-playa-estacionamiento';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<Array<AdministrarDestinoPostCaladoDataView>> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<Array<AdministrarDestinoPostCaladoDataView>>(query);
  }
}
