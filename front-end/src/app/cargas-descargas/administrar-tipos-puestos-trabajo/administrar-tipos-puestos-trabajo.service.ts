import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Observable } from 'rxjs';
import { AdministrarTiposPuestosTrabajoDataView } from '../../shared/data-models/administrar-tipos-puestos-trabajo-data-view';
import { TipoPuestoTrabajoCommand, CrearTipoPuestoTrabajoCommand, ModificarTipoPuestoTrabajoCommand } from '../../shared/data-models/commands/cargas-descargas/tipo-puesto-trabajo-command';
import { TiposPuestosTrabajoDataView } from '../../shared/data-models/tipos-puestos-trabajo-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarTiposPuestosTrabajoService
     extends AdministrableFormService<Array<AdministrarTiposPuestosTrabajoDataView>,
                                            TipoPuestoTrabajoCommand,
                                            CrearTipoPuestoTrabajoCommand,
                                            ModificarTipoPuestoTrabajoCommand,
                                            TiposPuestosTrabajoDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'tipos-puestos-trabajo';
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarTiposPuestosTrabajoDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'tipoPuestoTrabajo', 'tipoPuestoTrabajo');

    return this.apiService.get<AdministrarTiposPuestosTrabajoDataView[]>(query);
  }
}
