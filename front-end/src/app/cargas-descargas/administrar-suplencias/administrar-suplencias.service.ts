import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarSuplenciasDataView } from '../../shared/data-models/administrar-suplencias-data-view';
import { SuplenciaCommand, CrearSuplenciaCommand, ModificarSuplenciaCommand } from '../../shared/data-models/commands/cargas-descargas/suplencia-command';
import { SuplenciaDataView } from '../../shared/data-models/suplencia-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdministrarSuplenciasService extends AdministrableFormService<AdministrarSuplenciasDataView[],
                                                                           SuplenciaCommand,
                                                                           CrearSuplenciaCommand,
                                                                           ModificarSuplenciaCommand,
                                                                           SuplenciaDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'suplencias';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarSuplenciasDataView[]> {
    let query = `${this.apiRoute}?`;

    query += this.getQuerystringParameter(filters, 'usuarioOrigen');
    query += this.getQuerystringParameter(filters, 'usuarioDestino');
    query += this.getQuerystringParameter(filters, 'fechaDesde');
    query += this.getQuerystringParameter(filters, 'fechaHasta');
    query += this.getQuerystringParameter(filters, 'estaHabilitado');
    query += this.getQuerystringParameter(filters, 'vigente');

    return this.apiService.get<AdministrarSuplenciasDataView[]>(query);
  }

  get(id: number): Observable<SuplenciaDataView> {
    return this.apiService.get<SuplenciaDataView>(`${this.apiRoute}/${id}`);
  }
}
