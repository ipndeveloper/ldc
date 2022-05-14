import { Injectable } from '@angular/core';
import { AdministrarPlataformasdataView } from '../../shared/data-models/administrar-plataformas-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { PlataformaDescargaCommand, CrearPlataformaDescargaCommand, ModificarPlataformaDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/plataforma-descarga-command';
import { PlataformaDescarga } from '../../shared/data-models/plataforma-descarga';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPlataformasService extends AdministrableFormService<AdministrarPlataformasdataView[],
                                                    PlataformaDescargaCommand,
                                                    CrearPlataformaDescargaCommand,
                                                    ModificarPlataformaDescargaCommand,
                                                    PlataformaDescarga> {

   constructor(protected readonly apiService: ApiService) {
      super(apiService);
      this.apiRoute = 'plataforma-descarga';
    }

  public getData(filters: Dictionary<string>): Observable<AdministrarPlataformasdataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarPlataformasdataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public get(id: number): Observable<PlataformaDescarga> {
    return this.api.get<PlataformaDescarga>(`${this.apiRoute}/${id}`);
  }

  public create(command: CrearPlataformaDescargaCommand): Observable<void> {
    return this.api.post(this.apiRoute, command);
  }

  public update(command: ModificarPlataformaDescargaCommand): Observable<void> {
    return this.api.put(this.apiRoute, command);
  }

}
