import { Injectable } from '@angular/core';
import { AdministrarCircuitosDataView } from '../../shared/data-models/administrar-circuitos-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { CrearCircuitoCommand, ModificarCircuitoCommand, CircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/circuito-command';
import { CircuitoDataView } from '../../shared/data-models/circuito-data-view';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';

@Injectable({
  providedIn: 'root'
})

export class AdministrarCircuitoService extends AdministrableFormService<AdministrarCircuitosDataView[],
                                                                         CircuitoCommand,
                                                                         CrearCircuitoCommand,
                                                                         ModificarCircuitoCommand,
                                                                         CircuitoDataView> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'circuitos';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarCircuitosDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'tipoMovimiento', 'idTipoMovimiento');
    query += this.getQuerystringParameter(filters, 'tipoTransporte', 'idTipoTransporte');
    query += this.getQuerystringParameter(filters, 'tipoProducto', 'idTipoProducto');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarCircuitosDataView[]>(query);
  }

  get(id: number): Observable<CircuitoDataView> {
    return this.apiService.get<CircuitoDataView>(`${this.apiRoute}/detalles/${id}`);
  }

  copy(command: CrearCircuitoCommand): Observable<void> {
    return this.api.post(`${this.apiRoute}/copiar`, command);
  }
}
