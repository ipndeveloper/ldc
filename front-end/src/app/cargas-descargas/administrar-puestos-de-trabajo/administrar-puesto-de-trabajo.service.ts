import { Injectable } from '@angular/core';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { AdministrarPuestoTrabajoDataView } from '../../shared/data-models/administrar-puestos-de-trabajo-data-view';
import { Observable } from 'rxjs';
import { CrearPuestoTrabajoCommand, ModificarPuestoTrabajoCommand } from '../../shared/data-models/commands/cargas-descargas/puesto-trabajo-command';
import { PuestoTrabajoDataView } from '../../shared/data-models/puesto-trabajo-data-view';

@Injectable({
  providedIn: 'root'
})

export class AdministrarPuestoDeTrabajoService extends SearchFormService<AdministrarPuestoTrabajoDataView[]> {

  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'puesto-trabajo';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarPuestoTrabajoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'tipoPuestoTrabajo', 'idTipoPuestoTrabajo');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarPuestoTrabajoDataView[]>(query);
  }

  public crear(command: CrearPuestoTrabajoCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  public modificar(command: ModificarPuestoTrabajoCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  public eliminar(id: number): Observable<Object> {
    return this.apiService.delete(this.apiRoute, id);
  }

  public get(id: number): Observable<PuestoTrabajoDataView> {
    return this.apiService.get<PuestoTrabajoDataView>(`${this.apiRoute}/${id}`);
  }
}
