import { Injectable } from '@angular/core';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { AdministrarUsuariosDataView } from '../../shared/data-models/administrar-usuarios-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { CrearUsuarioCommand, ModificarUsuarioCommand } from '../../shared/data-models/commands/cargas-descargas/usuario.command';
import { UsuarioDataView, UsuarioADDataView } from '../../shared/data-models/usuario-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarUsuarioService extends SearchFormService<AdministrarUsuariosDataView[]> {

  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'usuarios';
  }

  validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  getData(filters: Dictionary<string>): Observable<AdministrarUsuariosDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'nombre');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarUsuariosDataView[]>(query);
  }

  crear(command: CrearUsuarioCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  modificar(command: ModificarUsuarioCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  get(id: number): Observable<UsuarioDataView> {
    return this.apiService.get<UsuarioDataView>(`${this.apiRoute}/${id}`);
  }

  buscarUsuarioEnActiveDirectory(nombreAD: string): Observable<UsuarioADDataView> {
    return this.apiService.get<UsuarioADDataView>(`${this.apiRoute}/active-directory?nombreUsuario=${nombreAD}`);
  }

  delete(id: number): Observable<Object> {
    return this.apiService.delete(this.apiRoute, id);
  }
}
