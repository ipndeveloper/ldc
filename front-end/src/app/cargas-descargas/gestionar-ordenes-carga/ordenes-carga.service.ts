import { Injectable } from '@angular/core';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { GestionarOrdenesCargaDataView } from '../../shared/data-models/gestionar-ordenes-carga-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})

export class OrdenesCargaService extends SearchFormService<Array<GestionarOrdenesCargaDataView>> {

  apiRoute = 'gestionar-ordenes-carga';

  constructor(protected readonly apiService: ApiService,
               private readonly popupService: PopupService) {
    super();
  }

  public getData(filters: Dictionary<string>): Observable<GestionarOrdenesCargaDataView[]> {
    let route = `${this.apiRoute}?`;

    route += this.getQuerystringParameter(filters, 'ordenCarga', 'ordenCarga');
    route += this.getQuerystringParameter(filters, 'patente', 'patente');
    route += this.getQuerystringParameter(filters, 'estadoCabecera', 'idEstadoCabecera');
    route += this.getQuerystringParameter(filters, 'estadoViaje', 'idEstadoViaje');
    route += this.getQuerystringParameter(filters, 'tipoProducto', 'idTipoProducto');
    route += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    route += this.getQuerystringParameter(filters, 'destinatario', 'idDestinatario');
    route += this.getQuerystringParameter(filters, 'transportista', 'idTransportista');

    return this.apiService.get<Array<GestionarOrdenesCargaDataView>>(route);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['ordenCarga']) { return true; }
      if (filters['patente']) { return true; }
      if (filters['tipoTransporte']) { return true; }
      if (filters['estadoCabecera']) { return true; }
      if (filters['estadoViaje']) { return true; }
      if (filters['tipoProducto']) { return true; }
      if (filters['producto']) { return true; }
      if (filters['destinatario']) { return true; }
      if (filters['transportista']) { return true; }

    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }
}
