import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarActividadesCircuitoDataView } from '../../shared/data-models/administrar-actividades-circuitos-data-view';
import { ActividadCircuitoCommand, CrearActividadCircuitoCommand, ModificarActividadCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/actividad-circuito-command';
import { ActividadCircuitoDataView } from '../../shared/data-models/actividad-circuito-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarActividadesCircuitoService extends AdministrableFormService<AdministrarActividadesCircuitoDataView[],
                                                                                    ActividadCircuitoCommand,
                                                                                    CrearActividadCircuitoCommand,
                                                                                    ModificarActividadCircuitoCommand,
                                                                                    ActividadCircuitoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'actividades-circuito';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarActividadesCircuitoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'circuito', 'idCircuito');
    query += this.getQuerystringParameter(filters, 'actividad', 'idActividad');
    query += this.getQuerystringParameter(filters, 'estadoInicial', 'idEstadoInicial');
    query += this.getQuerystringParameter(filters, 'estadoFinal', 'idEstadoFinal');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarActividadesCircuitoDataView[]>(query);
  }
}
