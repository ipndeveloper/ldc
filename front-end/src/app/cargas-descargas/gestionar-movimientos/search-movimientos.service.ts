import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { GestionarMovimientoDataView } from '../../shared/data-models/gestionar-movimientos/gestionar-movimiento-data-view';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchByDateRangeService } from '../../core/services/search-by-date-range.service';

@Injectable()
export class SearchMovimientosService
     extends SearchByDateRangeService<GestionarMovimientoDataView[]> {
  apiRoute: string;

  constructor(protected readonly apiService: ApiService,
              protected readonly popupService: PopupService) {
    super(apiService, popupService);
    this.apiRoute = 'gestionar-movimientos';
  }

  public getData(filters: Dictionary<string>): Observable<GestionarMovimientoDataView[]> {

    let query = `${this.apiRoute}?opcionFiltro=${filters['opcionFiltro']}`;

    const idTipoMovimiento = filters['tipoMovimiento'];
    const idTipoTransporte = filters['tipoTransporte'];

    if (idTipoMovimiento && idTipoMovimiento !== -1) {
      query += `&idTipoMovimiento=${idTipoMovimiento}`;
    }

    if (idTipoTransporte && idTipoTransporte !== -1) {
      query += `&idTipoTransporte=${idTipoTransporte}`;
    }

    if (filters['opcionFiltro'] === 1) {
      query += this.getQuerystringParameter(filters, 'tipoDocumento', 'idTipoDocumento');
      query += this.getQuerystringParameter(filters, 'nroDocumento', 'NroDocumentoOCTG');
    } else if (filters['opcionFiltro'] === 2) {
      query += this.getQuerystringParameter(filters, 'patente');
      query += this.getQuerystringParameter(filters, 'vagon');
      query += this.getQuerystringParameter(filters, 'tarjeta');
    } else {
      query += this.getQuerystringParameter(filters, 'fechaOperacionDesde');
      query += this.getQuerystringParameter(filters, 'fechaOperacionHasta');
    }

    return this.apiService.get<Array<GestionarMovimientoDataView>>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['opcionFiltro'] === 1 && !filters['nroDocumento']) {
        this.popupService.error( Resources.Messages.DebeIngresarUnDocumentoPorteOCTG, Resources.Labels.Buscar);
        return false;
      } else if (filters['opcionFiltro'] === 2 && !(filters['patente'] || filters['vagon'] || filters['tarjeta'])) {
        this.popupService.error( Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
        return false;
      } else if (filters['opcionFiltro'] === 3) {
        return filters['tipoMovimiento'] && filters['tipoTransporte']
         && this.fechaDesdeHastaValidas(filters['fechaOperacionDesde'], filters['fechaOperacionHasta'], 4);
      } else {
        return true;
      }
    }
    this.popupService.error( Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }
}
