import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { AdministrarEquivalenciaRubrosDataView } from '../../shared/data-models/administrar-equivalencia-rubros-data-view';
import { EquivalenciaRubrosCommand, CrearEquivalenciaRubrosCommand, ModificarEquivalenciaRubrosCommand } from '../../shared/data-models/commands/cargas-descargas/equivalencia-rubros-command';
import { EquivalenciaRubrosDataView } from '../../shared/data-models/equivalencia-rubros-data-view';

@Injectable({
  providedIn: 'root'
})

export class AdministrarEquivalenciaRubrosService
  extends AdministrableFormService<Array<AdministrarEquivalenciaRubrosDataView>,
                                   EquivalenciaRubrosCommand,
                                   CrearEquivalenciaRubrosCommand,
                                   ModificarEquivalenciaRubrosCommand,
                                   EquivalenciaRubrosDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'rubros-camara-producto';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<Array<AdministrarEquivalenciaRubrosDataView>> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    query += this.getQuerystringParameter(filters, 'camara', 'idCamara');
    query += this.getQuerystringParameter(filters, 'rubro', 'idRubro');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<Array<AdministrarEquivalenciaRubrosDataView>>(query);
  }
}
