import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { AdministrarTarjetaDataView } from '../../shared/data-models/administrar-tarjeta-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { TarjetaCommand, CrearTarjetaCommand, ModificarTarjetaCommand } from '../../shared/data-models/commands/cargas-descargas/tarjeta-command';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ImportarExcelTarjetaCommand } from '../../shared/data-models/commands/cargas-descargas/importar-excel-tarjeta-command';

@Injectable({
  providedIn: 'root'
})
export class AdministrarTarjetaService
     extends AdministrableFormService<AdministrarTarjetaDataView[],
                                      TarjetaCommand,
                                      CrearTarjetaCommand,
                                      ModificarTarjetaCommand,
                                      AdministrarTarjetaDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'tarjetas';
  }

  getData(filters: Dictionary<string>): Observable<AdministrarTarjetaDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringPrefixSuffix(filters, 'prefijo');
    query += this.getQuerystringParameter(filters, 'numero');
    query += this.getQuerystringParameter(filters, 'numeroDesde');
    query += this.getQuerystringParameter(filters, 'numeroHasta');
    query += this.getQuerystringPrefixSuffix(filters, 'sufijo');
    query += this.getQuerystringParameter(filters, 'habilitada');

    return this.apiService.get(query);
  }

  private getQuerystringPrefixSuffix(filters: Dictionary<string>, dictionaryKey: string): string {
    let querystring = '';
    if (filters.containsKey('numeroDesde') &&
        filters.item('numeroDesde') != null &&
        filters.containsKey(`${dictionaryKey}Desde`) &&
        filters.item(`${dictionaryKey}Desde`) != null) {
      querystring = `&${dictionaryKey}=${filters.item(`${dictionaryKey}Desde`)}`;
    } else {
      querystring = this.getQuerystringParameter(filters, dictionaryKey);
    }
    return querystring;
  }

  validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  create(command: CrearTarjetaCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  update(command: ModificarTarjetaCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  getTipoTarjetaPorTerminal(idTerminal: number): Observable<EntityWithDescription> {
    return this.apiService.get<EntityWithDescription>(`terminales/tipo-tarjeta?id=${idTerminal}`);
  }

  importarArchivoExcel(command: ImportarExcelTarjetaCommand): Observable<any> {
    return this.apiService.post(`${this.apiRoute}/importar`, command);
  }
}
