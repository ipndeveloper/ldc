import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarChoferesDataView } from '../../shared/data-models/administrar-choferes-data-view';
import { ChoferCommand, CrearChoferCommand, ModificarChoferCommand } from '../../shared/data-models/commands/cargas-descargas/chofer-command';
import { ChoferDataView } from '../../shared/data-models/chofer-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdministrarChoferService extends AdministrableFormService<AdministrarChoferesDataView[],
                                                                         ChoferCommand,
                                                                         CrearChoferCommand,
                                                                         ModificarChoferCommand,
                                                                         ChoferDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'choferes';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarChoferesDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'cuil', 'cuil');
    query += this.getQuerystringParameter(filters, 'apellidoYNombre', 'descripcion');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarChoferesDataView[]>(query);
  }

  get(id: number): Observable<ChoferDataView> {
    return this.apiService.get<ChoferDataView>(`${this.apiRoute}/${id}`);
  }
}
