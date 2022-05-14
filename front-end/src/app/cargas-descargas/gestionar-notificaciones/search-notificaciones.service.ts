import { Injectable } from '@angular/core';
import { GestionarNotificacionesDataView } from './gestionar-notificaciones-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Observable } from 'rxjs';
import { Dictionary } from '../../core/models/dictionary';
import { Resources } from '../../../locale/artifacts/resources';
import { ReintentarNotificacionCommand } from '../../shared/data-models/commands/cargas-descargas/reintentar-notificacion-command';
import { CancelarNotificacionesCommand } from '../../shared/data-models/commands/cargas-descargas/cancelar-notificaciones-command';
import { SearchByDateRangeService } from '../../core/services/search-by-date-range.service';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService extends SearchByDateRangeService<Array<GestionarNotificacionesDataView>> {
  apiRoute = 'gestionar-notificaciones';

  constructor(protected readonly apiService: ApiService,
    protected readonly popupService: PopupService) {
      super(apiService, popupService);
    }

  public getData(filters: Dictionary<string>): Observable<GestionarNotificacionesDataView[]> {
    let route = `${this.apiRoute}?`;


      route += this.getQuerystringParameter(filters, 'terminal', 'IdTerminal');
      route += this.getQuerystringParameter(filters, 'tipoNotificacion', 'IdTipoNotificacion');
      route += this.getQuerystringParameter(filters, 'fechaDesde', 'FechaDesde');
      route += this.getQuerystringParameter(filters, 'fechaHasta', 'FechaHasta');

    return this.apiService.get<Array<GestionarNotificacionesDataView>>(route);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {

    if (filters && filters['terminal']) {
      return this.fechaDesdeHastaValidas(filters['fechaDesde'], filters['fechaHasta']);
    }

    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnaTerminal, Resources.Labels.Buscar);
    return false;
  }

  public reintentar(command: ReintentarNotificacionCommand): Observable<void> {
    return this.apiService.post(`${this.apiRoute}/reintentar`, command);
  }

  public cancelar(command: CancelarNotificacionesCommand): Observable<void> {
    return this.apiService.post(`${this.apiRoute}/cancelar`, command);
  }

  protected fechaDesdeHastaValidas(fechaDesde: string, fechaHasta: string): boolean {
    let fechasValidas = true;

    if (fechaDesde && fechaHasta) {
      const fechaDesdeDate = (new Date(fechaDesde + 'T00:00:00')).valueOf();
      const fechaHastaDate = (new Date(fechaHasta + 'T00:00:00')).valueOf();
      const fechaHoy = new Date().valueOf();
      if (fechaDesdeDate > fechaHastaDate) {
        this.popupService.error(Resources.Messages.FechaDesdeDebeSerMenorOIgualAFechaHasta, Resources.Labels.Buscar);
        fechasValidas = false;
      }
      if (fechaHastaDate > fechaHoy) {
        this.popupService.error(Resources.Messages.FechaIngresadaHastaMenorOIgualADiaHoy, Resources.Labels.Buscar);
        fechasValidas = false;
      }
    } else {
      if (fechaDesde && !fechaHasta) {
        this.popupService.error(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaHasta),
         Resources.Labels.Buscar);
         fechasValidas = false;
      }
      if (fechaHasta && !fechaDesde) {
        this.popupService.error(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.FechaDesde),
        Resources.Labels.Buscar);
        fechasValidas = false;
      }
    }
    return fechasValidas;
  }

}
