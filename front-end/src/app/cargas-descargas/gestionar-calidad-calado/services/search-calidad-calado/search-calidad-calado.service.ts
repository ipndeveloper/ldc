import { ApiService } from '../../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { SearchFormService } from '../../../../core/components/search-form/services/search-form.service';
import { Injectable } from '@angular/core';
import { Dictionary } from '../../../../core/models/dictionary';
import { GestionarCalidadCaladoDataView } from '../../../../shared/data-models/gestionar-calidad-calado-data-view';

@Injectable()
export class SearchCalidadCaladoService extends SearchFormService<Array<GestionarCalidadCaladoDataView>> {

  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'gestionar-calidad-calado';
  }

  public getData(filters: Dictionary<string>): Observable<Array<GestionarCalidadCaladoDataView>> {
    let query = `${this.apiRoute}?`;

    const idEstado = filters['idEstadoMovimientoSelected'];

    if (idEstado && idEstado !== -1) {
      query += `&idEstadoMovimiento=${idEstado}`;
    }

    query += this.getQuerystringParameter(filters, 'patente');
    query += this.getQuerystringParameter(filters, 'tarjeta');
    query += this.getQuerystringParameter(filters, 'vagon');
    query += this.getQuerystringParameter(filters, 'tipoTransporte', 'IdTipoTransporte');
    query += this.getQuerystringParameter(filters, 'tipoMovimiento', 'idTipoMovimiento');

    return this.apiService.get<Array<GestionarCalidadCaladoDataView>>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    return filters !== undefined;
  }
}
