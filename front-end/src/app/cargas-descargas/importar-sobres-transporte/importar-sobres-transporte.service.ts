import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ImportarSobresTransporteDataView } from '../../shared/data-models/importar-sobres-transporte-data-view';
import { SobreTransporteCommand, CrearSobreTransporteCommand, ModificarSobreTransporteCommand } from '../../shared/data-models/commands/cargas-descargas/sobre-transporte-command';
import { SobreTransporteDataView } from '../../shared/data-models/sobre-transporte-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ImportarSobresTransporteService extends
  AdministrableFormService<ImportarSobresTransporteDataView[],
                           SobreTransporteCommand,
                           CrearSobreTransporteCommand,
                           ModificarSobreTransporteCommand,
                           SobreTransporteDataView> {

  constructor(apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'sobres-transporte/importar/';
  }

  validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    return !!filters;
  }

  getData(filters: Dictionary<string>): Observable<ImportarSobresTransporteDataView[]> {
    let query = `${this.apiRoute}?`;

    query += this.getQuerystringParameter(filters, 'nombre');
    query += this.getQuerystringParameter(filters, 'estado', 'idEstado');
    query += this.getQuerystringParameter(filters, 'fechaCreacion');
    query += this.getQuerystringParameter(filters, 'nombreUsuarioCreacion');
    query += this.getQuerystringParameter(filters, 'ambienteOriginante');
    query += this.getQuerystringParameter(filters, 'tipo', 'idTipo');

    return this.api.get<ImportarSobresTransporteDataView[]>(query);
  }

  importar(id: number): Observable<void> {
    return this.api.post(`${this.apiRoute}`, {id});
  }
}
