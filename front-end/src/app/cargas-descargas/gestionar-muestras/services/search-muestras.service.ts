import { Injectable } from '@angular/core';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { GestionarMuestrasDataView } from '../../../shared/data-models/gestionar-muestras-data-view';
import { ApiService } from '../../../core/services/restClient/api.service';
import { EstadoMuestra } from '../../../shared/data-models/estado-muestra';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { SearchByDateRangeService } from '../../../core/services/search-by-date-range.service';

@Injectable()
export class SearchMuestrasService extends SearchByDateRangeService<GestionarMuestrasDataView[]> {

  constructor(protected readonly apiService: ApiService, protected readonly popupService: PopupService) {
      super(apiService, popupService);
      this.apiRoute = 'gestionar-muestras';
  }

  public getData(filters: Dictionary<string>): Observable<GestionarMuestrasDataView[]> {

    let query = `${this.apiRoute}?fechaDesde=${filters['fechaDesde']}&fechaHasta=${filters['fechaHasta']}`;
    query += this.getQuerystringParameter(filters, 'codigoBarras');

    const idEstado = filters['idEstado'];
    if (idEstado && idEstado === -1) {
      const allEstadoMuestra = filters['allEstadoMuestra'];
      query += '&' + Object.keys(allEstadoMuestra).map(key => 'idsEstadoMuestra=' + (allEstadoMuestra[key] as EstadoMuestra).id).join('&');
    } else {
      query += '&idsEstadoMuestra=' + idEstado;
    }

    return this.apiService.get<Array<GestionarMuestrasDataView>>(query);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return this.fechaDesdeHastaValidas(filters['fechaDesde'], filters['fechaHasta']);
    }
    return false;
  }
}
