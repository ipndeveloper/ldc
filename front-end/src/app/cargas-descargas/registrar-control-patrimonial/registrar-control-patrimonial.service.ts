import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ControlarCalidadCargaDataView } from '../../shared/data-models/controlar-calidad-carga-data-view';
import { RegistrarControlPatrimonialCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-control-patrimonial-command';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { DecisionControlPatrimonialDataView } from '../../shared/data-models/decision-control-patrimonial-data-view';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { CrearRolCommand, ModificarRolCommand } from '../../shared/data-models/commands/cargas-descargas/rol-command';
import { PopupService } from '../../core/services/popupService/popup.service';
import { DecisionControlPatrimonial } from '../../shared/data-models/decision-control-patrimonial';

@Injectable({
  providedIn: 'root'
})

export class RegistrarControlPatrimonialService
  extends AdministrableFormService<Array<ControlarCalidadCargaDataView>,
                                   RegistrarControlPatrimonialCommand,
                                   RegistrarControlPatrimonialCommand,
                                   RegistrarControlPatrimonialCommand,
                                   DecisionControlPatrimonialDataView> {

  api;
  private readonly url: string = 'registrar-control-patrimonial';

  constructor(protected readonly apiService: ApiService,
    private readonly popupService: PopupService) {
    super(apiService);
    this.apiRoute = 'registrar-control-patrimonial';
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

  public get(id: number): Observable<DecisionControlPatrimonialDataView> {
    return this.apiService.get<DecisionControlPatrimonialDataView>(`${this.apiRoute}/${id}`);
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

  public getDecisiones(idMovimiento: number): Observable<DecisionControlPatrimonial[]> {
    const apiUrl = `${this.url}/${idMovimiento}`;

    return this.apiService.get<DecisionControlPatrimonial[]>(apiUrl);
  }

  public getByNavigtion(id: number): Observable<ControlarCalidadCargaDataView> {
    return this.apiService.get<ControlarCalidadCargaDataView>(`${this.url}/${id}/por-navegacion`);
  }
}
