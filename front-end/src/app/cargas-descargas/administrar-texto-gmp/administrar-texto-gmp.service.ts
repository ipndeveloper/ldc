import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';
import { AdministrarLeyendaGmpDataView } from '../../shared/data-models/administrar-leyenda-gmp-data-view';
import { CrearLeyendaGmpPorSociedadCommand, ModificarLeyendaGmpPorSociedadCommand, LeyendaGmpPorSociedadCommand } from '../../shared/data-models/commands/cargas-descargas/leyenda-gmp-por-sociedad-command';
import { LeyendaGmpDataView } from '../../shared/data-models/leyenda-gmp-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarTextoGmpService
  extends AdministrableFormService<Array<AdministrarLeyendaGmpDataView>,
                                   LeyendaGmpPorSociedadCommand,
                                   CrearLeyendaGmpPorSociedadCommand,
                                   ModificarLeyendaGmpPorSociedadCommand,
                                   LeyendaGmpDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'leyenda-gmp';
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarLeyendaGmpDataView[]> {
    let query = `${this.apiRoute}/filtro?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'sociedad', 'idSociedad');
    query += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarLeyendaGmpDataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      return true;
    }
    return false;
  }
}
