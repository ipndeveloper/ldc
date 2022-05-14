import { Injectable } from '@angular/core';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { AdministrarNotificacionesDataView } from '../../shared/data-models/administrar-notificaciones-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { CrearMailTemplateCommand, ModificarMailTemplateCommand } from '../../shared/data-models/commands/cargas-descargas/mail-template-command';
import { MailTemplateDataView } from '../../shared/data-models/mail-template-data-view';

@Injectable({
  providedIn: 'root'
})
export class MailTemplateService extends SearchFormService<AdministrarNotificacionesDataView[]> {

  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'mail-templates';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarNotificacionesDataView[]> {
    let query = `${this.apiRoute}?`;

    query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
    query += this.getQuerystringParameter(filters, 'tipoNotificacion', 'idTipoNotificacion');
    query += this.getQuerystringParameter(filters, 'usuario', 'usuario');

    return this.apiService.get<AdministrarNotificacionesDataView[]>(query);
  }

  public crear(command: CrearMailTemplateCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  public modificar(command: ModificarMailTemplateCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  public get(id: number): Observable<MailTemplateDataView> {
    return this.apiService.get<MailTemplateDataView>(`${this.apiRoute}/${id}`);
  }

  public eliminar(id: number): Observable<Object> {
    return this.apiService.delete(this.apiRoute, id);
  }
}
