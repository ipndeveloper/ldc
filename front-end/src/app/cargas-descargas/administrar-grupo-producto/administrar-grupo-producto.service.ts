import { Injectable } from '@angular/core';
import { AdministrarGrupoProductoDataView } from '../../shared/data-models/administrar-grupo-producto-data-view';
import {
  GrupoProductoModificacionFueraCircuitoCommand,
  CrearGrupoProductoModificacionFueraCircuitoCommand,
  ModificarGrupoProductoModificacionFueraCircuitoCommand
} from '../../shared/data-models/commands/cargas-descargas/grupo-producto-modificacion-fuera-circuito-command';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { GrupoProductoModificacionFueraCircuitoDataView } from '../../shared/data-models/grupo-producto-modificacion-fuera-circuito-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarGrupoProductoService extends AdministrableFormService<
  AdministrarGrupoProductoDataView[],
  GrupoProductoModificacionFueraCircuitoCommand,
  CrearGrupoProductoModificacionFueraCircuitoCommand,
  ModificarGrupoProductoModificacionFueraCircuitoCommand,
  GrupoProductoModificacionFueraCircuitoDataView
> {
  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'grupo-producto';
  }

  public getData(
    filters: Dictionary<string>
  ): Observable<AdministrarGrupoProductoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'descripcion');
    query += this.getQuerystringParameter(filters, 'tipoProducto', 'idTipoProducto');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarGrupoProductoDataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }
}
