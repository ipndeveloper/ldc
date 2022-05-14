import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { ParametrosPorRubroCalidadCommand, CrearParametrosPorRubroCalidadCommand, ModificarParametrosPorRubroCalidadCommand } from '../../shared/data-models/commands/cargas-descargas/parametros-por-rubro-calidad-command';
import { ParametrosPorRubroCalidadDataView } from '../../shared/data-models/parametros-por-rubro-calidad-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarParametrosPorRubroCalidadService extends AdministrableFormService<ParametrosPorRubroCalidadDataView[],
  ParametrosPorRubroCalidadCommand,
  CrearParametrosPorRubroCalidadCommand,
  ModificarParametrosPorRubroCalidadCommand,
  ParametrosPorRubroCalidadDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'parametros-rubro-calidad';
  }

  public getData(): Observable<ParametrosPorRubroCalidadDataView[]> {
    const query = `${this.apiRoute}`;
    return this.apiService.get<ParametrosPorRubroCalidadDataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  modificarParametros(command: ModificarParametrosPorRubroCalidadCommand): Observable<void> {
    return this.apiService.put(`${this.apiRoute}/`, command);
  }
}
