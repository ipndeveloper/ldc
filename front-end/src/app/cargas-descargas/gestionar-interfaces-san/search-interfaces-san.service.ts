import { Injectable } from '@angular/core';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { GestionarInterfacesSanDataView } from './gestionar-interfaces-san-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { EstadoMovimiento } from '../../shared/data-models/estado-movimiento';
import { Resources } from '../../../locale/artifacts/resources';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ReintentarInterfazSanCommand } from '../../shared/data-models/commands/cargas-descargas/reintentar-interfaz-san-command';
import { EstadosInterfazSan } from '../../shared/enums/enums';

@Injectable({
  providedIn: 'root'
})
export class InterfacesSanService extends SearchFormService<Array<GestionarInterfacesSanDataView>> {

  apiRoute = 'gestionar-interfaces-san';

  constructor(protected readonly apiService: ApiService,
               private readonly popupService: PopupService) {
    super();
  }

  public getData(filters: Dictionary<string>): Observable<GestionarInterfacesSanDataView[]> {
    let route = `${this.apiRoute}?`;

    const idEstadoSelected = filters['estado'].id;
    if (idEstadoSelected === -1) {
      const allEstadoMovimiento = filters['allEstado'];
      route += Object.keys(allEstadoMovimiento)
                             .map(key => 'IdsEstado=' + (allEstadoMovimiento[key] as EstadoMovimiento).id)
                             .join('&');
    } else {
      route += `&idsEstado=${idEstadoSelected}`;
    }

    route += this.getQuerystringParameter(filters, 'tipoMovimiento', 'idTipoMovimiento');
    route += this.getQuerystringParameter(filters, 'tipoTransporte', 'idTipoTransporte');
    route += this.getQuerystringParameter(filters, 'servicioSan', 'idServicioSan');
    route += this.getQuerystringParameter(filters, 'nroDocPorte');
    route += this.getQuerystringParameter(filters, 'fechaIngresoDesde');
    route += this.getQuerystringParameter(filters, 'fechaIngresoHasta');
    route += this.getQuerystringParameter(filters, 'ctg');
    route += this.getQuerystringParameter(filters, 'tipoDocPorte', 'idTipoDocPorte');

    return this.apiService.get<Array<GestionarInterfacesSanDataView>>(route);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['estado']) {
        if (filters['estado'].id === EstadosInterfazSan.Finalizado) {
          if (filters['nroDocPorte']) {
            return true;
          } else {
            this.popupService.error(Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDocumentoPorte));
            return false;
          }
        } else {
          return true;
        }
      }
      if (filters['servicioSan']) { return true; }
      if (filters['tipoMovimiento']) { return true; }
      if (filters['tipoTransporte']) { return true; }
      if (filters['nroDocPorte']) { return true; }
      if (filters['fechaIngresoDesde']) { return true; }
      if (filters['fechaIngresoHasta']) { return true; }
      if (filters['ctg']) { return true; }
      if (filters['tipoDocPorte']) { return true; }
    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }

  public reintentar(command: ReintentarInterfazSanCommand): Observable<void> {
    return this.apiService.post(this.apiRoute, command);
  }

  public reEjecutar(): Observable<void> {
    return this.apiService.post(`${this.apiRoute}/re-ejecutar`, {});
  }
}
