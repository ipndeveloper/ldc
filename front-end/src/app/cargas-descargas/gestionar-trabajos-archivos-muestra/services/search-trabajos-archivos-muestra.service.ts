import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { GestionarTrabajosGeneracionArchivosMuestraDataView } from '../../../shared/data-models/gestionar-trabajos-generacion-archivos-muestra-data-view';
import { EstadoTrabajoGeneracionArchivoMuestra } from '../../../shared/data-models/estado-trabajo-generacion-archivo-muestra';
import { SearchByDateRangeService } from '../../../core/services/search-by-date-range.service';
import { ParametrosTerminalService } from '../../shared/services/parametros-terminal.service';
import { Resources } from '../../../../locale/artifacts/resources';

@Injectable()
export class SearchTrabajosArchivosMuestraService
  extends SearchByDateRangeService<GestionarTrabajosGeneracionArchivosMuestraDataView[]> {

  constructor(apiService: ApiService, popupService: PopupService,
    public readonly parametrosTerminalService: ParametrosTerminalService) {
    super(apiService, popupService);
    this.apiRoute = 'gestionar-trabajos-generacion-archivos-muestras';
  }

  public getData(filters: Dictionary<string>): Observable<GestionarTrabajosGeneracionArchivosMuestraDataView[]> {

    let query = `${this.apiRoute}?fechaDesde=${filters['fechaDesde']}&fechaHasta=${filters['fechaHasta']}`;

    const idEstado = filters['idEstado'];

    if (idEstado && idEstado === -1) {
      const allEstadoTrabajo = filters['allEstadoTrabajo'];
      query += '&' + Object.keys(allEstadoTrabajo).map(key =>
        'idsEstadoTrabajo=' + (allEstadoTrabajo[key] as EstadoTrabajoGeneracionArchivoMuestra).id)
        .join('&');
    } else {
      query += '&idsEstadoTrabajo=' + idEstado;
    }

    return this.apiService.get<Array<GestionarTrabajosGeneracionArchivosMuestraDataView>>(query);
  }

  protected fechaDesdeHastaValidas(fechaDesdeString: string, fechaHastaString: string, rango): boolean {

    if (super.fechaDesdeHastaValidas(fechaDesdeString, fechaHastaString) &&
        fechaDesdeString && fechaHastaString) {
      const fechaDesde = (new Date(fechaDesdeString + 'T00:00:00')).valueOf();
      const fechaHasta = (new Date(fechaHastaString + 'T00:00:00')).valueOf();
      if ((fechaHasta - fechaDesde) / (1000 * 60 * 60 * 24) > rango) {
        this.popupService.error(Resources.Messages.FechaDesdeHastaMenorADiasParametrizados +
          rango + '.', 'Notificación');
      } else {
        return true;
      }
    }
    return false;
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return this.fechaDesdeHastaValidas(filters['fechaDesde'], filters['fechaHasta'], filters['parametroDiasFiltro']);
    }
    return false;
  }
}
