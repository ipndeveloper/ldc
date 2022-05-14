import { Injectable } from '@angular/core';
import { GestionarInterfacesAfipDataView } from '../gestionar-interfaces-afip-data-view';
import { ApiService } from '../../../core/services/restClient/api.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { Resources } from '../../../../locale/artifacts/resources';
import { ConfirmacionManualCtgCommand } from '../../commands/confirmacion-manual-ctg-command';
import { SearchByDateRangeService } from '../../../core/services/search-by-date-range.service';

@Injectable()
export class GestionarInterfacesAfipService extends SearchByDateRangeService<Array<GestionarInterfacesAfipDataView>> {

  apiRoute: string;

  constructor(protected readonly apiService: ApiService,
              protected readonly popupService: PopupService) {
    super(apiService, popupService);
  }

  public getData(filters: Dictionary<string>): Observable<Array<GestionarInterfacesAfipDataView>> {

    this.apiRoute = 'gestionar-interfaces-afip?idServicioAfip=';

    if (filters['servicio-afip']) {
      this.apiRoute = this.apiRoute + filters['servicio-afip'].id;
    }

    this.apiRoute = this.apiRoute + '&fechaDesde=';

    if (filters['fecha-desde']) {
      this.apiRoute = this.apiRoute + filters['fecha-desde'];
    }

    this.apiRoute = this.apiRoute + '&fechaHasta=';

    if (filters['fecha-hasta']) {
      this.apiRoute = this.apiRoute + filters['fecha-hasta'];
    }

    if (filters['ctg']) {
      this.apiRoute = this.apiRoute + '&ctg=' + filters['ctg'];
    }

    return this.apiService.get<Array<GestionarInterfacesAfipDataView>>(this.apiRoute);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['servicio-afip'] && (filters['fecha-desde'] || filters['fecha-hasta'])) {
        return this.fechaDesdeHastaValidas(filters['fecha-desde'], filters['fecha-hasta'], 7);
      }

      if (filters['servicio-afip'] && filters['ctg']) {
        return true;
      }
    }

    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }

  public recuperarDetalleError(idInterfazAfip: number): Observable<string> {
    return this.apiService.get<string>('gestionar-interfaces-afip/error/' + idInterfazAfip);
  }

  confirmarManual(idInterfaz: number, codigoConfirmacion: number): Observable<void> {

    const url = `gestionar-interfaces-afip/confirmacion-manual`;
    const command = new  ConfirmacionManualCtgCommand(idInterfaz, codigoConfirmacion);

    return this.apiService.post(url, command);
  }

  reintentar(idInterfaz: number): Observable<void> {

    const url = `gestionar-interfaces-afip/reintentar`;
    const command = new  ConfirmacionManualCtgCommand(idInterfaz, 0);

    return this.apiService.patch(url, command);
  }

}
