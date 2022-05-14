import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { AdministrarPuntosCargadataView } from '../../shared/data-models/administrar-puntos-carga-data-view';
import { PuntoCarga } from '../../shared/data-models/punto-carga';
import { CrearPuntoCargaCommand, ModificarPuntoCargaCommand, PuntoCargaCommand } from '../../shared/data-models/commands/cargas-descargas/punto-carga-command';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPuntosCargaService extends AdministrableFormService<AdministrarPuntosCargadataView[],
                                                                            PuntoCargaCommand,
                                                                            CrearPuntoCargaCommand,
                                                                            ModificarPuntoCargaCommand,
                                                                            PuntoCarga> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'punto-carga';
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarPuntosCargadataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'habilitado');

    return this.apiService.get<AdministrarPuntosCargadataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public get(id: number): Observable<PuntoCarga> {
    return this.api.get<PuntoCarga>(`${this.apiRoute}/${id}`);
  }

  public create(command: CrearPuntoCargaCommand): Observable<void> {
    return this.api.post(this.apiRoute, command);
  }

  public update(command: ModificarPuntoCargaCommand): Observable<void> {
    return this.api.put(this.apiRoute, command);
  }
}
