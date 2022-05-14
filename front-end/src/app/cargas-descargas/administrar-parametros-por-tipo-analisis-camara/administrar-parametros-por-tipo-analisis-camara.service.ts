import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { AdministrarParametrosPorTipoAnalisisCamaraDataView } from '../../shared/data-models/administrar-parametros-por-tipo-analisis-camara-data-view';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { TipoAnalisisCamaraCommand, CrearTipoAnalisisCamaraCommand, ModificarParametrosGrupoRubroCalidadAnalisisCommand } from '../../shared/data-models/commands/cargas-descargas/tipo-analisis-camara-command';
import { Dictionary } from '../../core/models/dictionary';
import { ParametrosPorTipoAnalisisCamaraDataView } from '../../shared/data-models/parametros-por-tipo-analisis-camara-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarParametrosPorTipoAnalisisCamaraService
       extends AdministrableFormService<AdministrarParametrosPorTipoAnalisisCamaraDataView[],
                                        TipoAnalisisCamaraCommand,
                                        CrearTipoAnalisisCamaraCommand,
                                        ModificarParametrosGrupoRubroCalidadAnalisisCommand,
                                        ParametrosPorTipoAnalisisCamaraDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'parametros-tipo-analisis-camara';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarParametrosPorTipoAnalisisCamaraDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'idProducto');
    query += this.getQuerystringParameter(filters, 'idTerminal');
    query += this.getQuerystringParameter(filters, 'idTipoAnalisis');

    return this.apiService.get<AdministrarParametrosPorTipoAnalisisCamaraDataView[]>(query);
  }

  public get(id: number): Observable<ParametrosPorTipoAnalisisCamaraDataView> {
    return this.apiService.get(`${this.apiRoute}/${id}`);
  }
}
