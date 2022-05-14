import { Injectable } from '@angular/core';
import { GestionarDescargasEntregadorDataView } from '../../../shared/data-models/gestionar-desgargas-entregador-data-view';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { SearchByDateRangeService } from '../../../core/services/search-by-date-range.service';

@Injectable()
export class SearchDescargasCamionesService extends SearchByDateRangeService<Array<GestionarDescargasEntregadorDataView>> {

  constructor(protected readonly apiService: ApiService,
              protected readonly popupService: PopupService) {
    super(apiService, popupService);
    this.apiRoute = 'gestionar-descargas-entregador';
  }

  public getData(filters: Dictionary<string>): Observable<Array<GestionarDescargasEntregadorDataView>> {
    let query = `${this.apiRoute}?`;

    const idEstado = filters['idEstadoMovimientoSelected'];
    if (idEstado && idEstado !== -1) {
      query += '&idEstadoMovimiento=' + idEstado;
    }

    query += this.getQuerystringParameter(filters, 'tipoDocPorte');
    query += this.getQuerystringParameter(filters, 'turno');
    query += this.getQuerystringParameter(filters, 'nroDocPorte');
    query += this.getQuerystringParameter(filters, 'ctg');
    query += this.getQuerystringParameter(filters, 'enCircuito');
    query += this.getQuerystringParameter(filters, 'fechaHasta');
    query += this.getQuerystringParameter(filters, 'fechaDesde');
    query += this.getQuerystringParameter(filters, 'patente');
    query += this.getQuerystringParameter(filters, 'vagon');
    query += this.getQuerystringParameter(filters, 'tipoTransporte', 'idTipoTransporte');

    return this.apiService.get<Array<GestionarDescargasEntregadorDataView>>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters && filters['enCircuito'] === false) {
      return this.fechaDesdeHastaValidas(filters['fechaDesde'], filters['fechaHasta'], 7);
    }
    return true;
  }
}
