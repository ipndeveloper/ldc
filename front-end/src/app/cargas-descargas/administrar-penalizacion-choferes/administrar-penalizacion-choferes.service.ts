import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarPenalizacionesChoferDataView } from '../../shared/data-models/Administrar-penalizaciones-choferes-data-view';
import { PenalizacionChoferCommand, CrearPenalizacionChoferCommand, ModificarPenalizacionChoferCommand } from '../../shared/data-models/commands/cargas-descargas/penalizacion-chofer-command';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { PenalizacionChoferDataView } from '../../shared/data-models/Penalizacion-Chofer-Data-View';

@Injectable({
  providedIn: 'root'
})
export class AdministrarPenalizacionChoferesService extends AdministrableFormService<Array<AdministrarPenalizacionesChoferDataView>,
                                                                        PenalizacionChoferCommand,
                                                                        CrearPenalizacionChoferCommand,
                                                                        ModificarPenalizacionChoferCommand,
                                                                        PenalizacionChoferDataView>  {
  constructor(private readonly apiService: ApiService,
              private readonly popupService: PopupService) {
    super(apiService);
    this.apiRoute = 'penalizacion-choferes';
   }
  public getData(filters: Dictionary<string>): Observable<Array<AdministrarPenalizacionesChoferDataView>> {
    let query = `${this.apiRoute}?`;

    query += this.getQuerystringParameter(filters, 'chofer', 'Id');
    query += this.getQuerystringParameter(filters, 'apellidoYNombre');
    query += this.getQuerystringParameter(filters, 'habilitado');
    query += this.getQuerystringParameter(filters, 'vigente');

    return this.apiService.get<AdministrarPenalizacionesChoferDataView[]>(query);
  }
  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }

  get(id: number): Observable<PenalizacionChoferDataView> {
    return this.apiService.get<PenalizacionChoferDataView>(`${this.apiRoute}/${id}`);
  }

  create(command: CrearPenalizacionChoferCommand): Observable<void> {
    return this.api.post(this.apiRoute, command);
  }

  update(command: ModificarPenalizacionChoferCommand): Observable<void> {
    return this.api.put(this.apiRoute, command);
  }

}
