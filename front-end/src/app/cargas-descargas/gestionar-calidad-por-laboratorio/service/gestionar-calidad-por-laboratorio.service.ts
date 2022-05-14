import { Injectable } from '@angular/core';
import { CalidadPorLaboratorioDataView } from '../calidad-por-laboratorio-data-view';
import { SearchFormService } from '../../../core/components/search-form/services/search-form.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { Resources } from '../../../../locale/artifacts/resources';
import { DetalleMuestrasDataView } from '../detalle-muestras-data-view';
import { RegistrarDecisionCommand } from '../registrar-decision-command';
import { Circuito } from '../../../shared/data-models/circuito/circuito';

@Injectable()
export class GestionarCalidadPorLaboratorioService extends SearchFormService<Array<CalidadPorLaboratorioDataView>> {
  apiRoute = 'gestionar-calidad-por-laboratorio';

  constructor(protected readonly apiService: ApiService,
    private readonly popupService: PopupService) {
      super();
    }

  public getData(filters: Dictionary<string>): Observable<CalidadPorLaboratorioDataView[]> {
    let url = this.apiRoute + '?';

    url += 'codigoMuestra=';
    if (filters['codigoMuestra']) {
      url += filters['codigoMuestra'];
    }

    url += this.getQuerystringParameter(filters, 'patente');
    url += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    url += this.getQuerystringParameter(filters, 'turno');

    return this.apiService.get<Array<CalidadPorLaboratorioDataView>>(url);
  }

  public getDetalleMuestras(idCalidadMovimientoCereal: number): Observable<DetalleMuestrasDataView[]> {
    const url = `${this.apiRoute}/detalle-muestras?idCalidadMovimientoCereal=${idCalidadMovimientoCereal}`;

    return this.apiService.get<Array<DetalleMuestrasDataView>>(url);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['codigoMuestra']) { return true; }
      if (filters['patente']) { return true; }
      if (filters['turno']) { return true; }
      if (filters['producto']) { return true; }
    }
    this.popupService.error( Resources.Messages.DebeSeleccionarAlMenosUnFiltro,
      Resources.Labels.Buscar);
    return false;
  }

  public registrarDecision(command: RegistrarDecisionCommand): Observable<void> {
    const url = this.apiRoute + '/registrar-decision';

    return this.apiService.post(url, command);
  }

  public getCircuito(idCalidadMovimientoCereal: number): Observable<Circuito> {
    return this.apiService.get(`${this.apiRoute}/circuito/${idCalidadMovimientoCereal}`);
  }
}
