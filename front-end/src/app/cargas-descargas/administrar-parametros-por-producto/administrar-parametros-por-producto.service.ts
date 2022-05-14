import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { AdministrarParametrosPorProductoDataView } from '../../shared/data-models/administrar-parametros-por-producto-data-view';
import { ProductoCommand, CrearProductoCommand, ModificarProductoCommand } from '../../shared/data-models/commands/cargas-descargas/producto-command';
import { ProductoDataView } from '../../shared/data-models/producto-data-view';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { ParametrosPorProductoDataView } from '../../shared/data-models/parametros-por-producto-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarParametrosPorProductoService
     extends AdministrableFormService<AdministrarParametrosPorProductoDataView[],
                                      ProductoCommand,
                                      CrearProductoCommand,
                                      ModificarProductoCommand,
                                      ProductoDataView> {


  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'producto/parametros';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarParametrosPorProductoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'producto');

    return this.apiService.get<AdministrarParametrosPorProductoDataView[]>(query);
  }

  public getDataById(idProduct: number): Observable<ParametrosPorProductoDataView> {
    const query = `${this.apiRoute}/${idProduct}`;

    return this.apiService.get<ParametrosPorProductoDataView>(query);
  }

}
