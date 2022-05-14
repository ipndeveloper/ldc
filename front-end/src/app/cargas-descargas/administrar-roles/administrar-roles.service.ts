import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { AdministrarRolessDataView as AdministrarRolesDataView } from '../../shared/data-models/administrar-roles-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { CrearRolCommand, ModificarRolCommand } from '../../shared/data-models/commands/cargas-descargas/rol-command';

@Injectable({
  providedIn: 'root'
})
export class AdministrarRolesService  extends SearchFormService<AdministrarRolesDataView[]> {

  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'roles';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarRolesDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'descripcion');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarRolesDataView[]>(query);
  }

  public get(id: number): Observable<AdministrarRolesDataView> {
    return this.apiService.get<AdministrarRolesDataView>(`${this.apiRoute}/${id}`);
  }

  public crear(command: CrearRolCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  public modificar(command: ModificarRolCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  public eliminar(id: number): Observable<Object> {
    return this.apiService.delete(this.apiRoute, id);
  }
}
