import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { ControlarCalidadCargaDataView } from '../../shared/data-models/controlar-calidad-carga-data-view';
import { Observable } from 'rxjs';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { CrearRolCommand, ModificarRolCommand } from '../../shared/data-models/commands/cargas-descargas/rol-command';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ControlarCalidadCamionCargaCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-calidad-camion-carga-command';
import { DecisionControlarCalidadCamionCargaDataView } from '../../shared/data-models/decision-controlar-calidad-camion-carga-cata-view';

@Injectable({
  providedIn: 'root'
})
export class ControlarCalidadCamionCargaService
extends AdministrableFormService<Array<ControlarCalidadCargaDataView>,
                                ControlarCalidadCamionCargaCommand,
                                ControlarCalidadCamionCargaCommand,
                                ControlarCalidadCamionCargaCommand,
                                DecisionControlarCalidadCamionCargaDataView> {

  api;

  constructor(protected readonly apiService: ApiService,
    private readonly popupService: PopupService) {
    super(apiService);
    this.apiRoute = 'controlar-calidad-camion-carga';
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['patente']) { return true; }
      if (filters['tarjeta']) { return true; }
      if (filters['producto']) { return true; }
      if (filters['numeroDocumento']) { return true; }
    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro,
      Resources.Labels.Buscar);
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<ControlarCalidadCargaDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'patente', 'patenteCamion');
    query += this.getQuerystringParameter(filters, 'tarjeta');
    query += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    query += this.getQuerystringParameter(filters, 'numeroDocumento');

    return this.apiService.get<ControlarCalidadCargaDataView[]>(query);
  }

  public get(id: number): Observable<DecisionControlarCalidadCamionCargaDataView> {
    return this.apiService.get<DecisionControlarCalidadCamionCargaDataView>(`${this.apiRoute}/${id}`);
  }

  public crear(command: CrearRolCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  public modificar(command: ModificarRolCommand): Observable<void> {
    return this.apiService.put(this.apiRoute, command);
  }

  public eliminar(id: number): Observable<Object> {
    return this.apiService.delete(this.apiRoute, id);
  }
}
