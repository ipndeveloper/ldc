import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { PopupService } from '../../core/services/popupService/popup.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { GestionarTransportesCircuitoDataView } from './gestionar-transportes-circuito-data-view';

@Injectable({
  providedIn: 'root'
})
export class GestionarTransportesCircuitoService extends SearchFormService<Array<GestionarTransportesCircuitoDataView>> {
  apiRoute: string;

  constructor(protected readonly apiService: ApiService,
              private readonly popupService: PopupService) {
    super();
  }

  public getData(filters: Dictionary<string>): Observable<GestionarTransportesCircuitoDataView[]> {
    this.apiRoute = 'gestionar-transporte-circuito?';

    const idEstadoMovimientoSelected = filters['estado'].id;
    if (idEstadoMovimientoSelected && idEstadoMovimientoSelected !== -1) {
      this.apiRoute += `&IdEstado=${idEstadoMovimientoSelected}`;
    }

    this.apiRoute += this.getQuerystringParameter(filters, 'tipo-documento', 'IdTipoDocumento');
    this.apiRoute += this.getQuerystringParameter(filters, 'nro-documento', 'NumeroDocumento');
    this.apiRoute += this.getQuerystringParameter(filters, 'ctg', 'Ctg');
    this.apiRoute += this.getQuerystringParameter(filters, 'tarjeta');
    this.apiRoute += this.getQuerystringParameter(filters, 'producto', 'IdProducto');
    this.apiRoute += this.getQuerystringParameter(filters, 'Vagon');
    this.apiRoute += this.getQuerystringParameter(filters, 'patenteCamion');
    this.apiRoute += this.getQuerystringParameter(filters, 'fechaEntrada');
    this.apiRoute += this.getQuerystringParameter(filters, 'tipoTransporte', 'IdTipoTransporte');
    this.apiRoute += this.getQuerystringParameter(filters, 'tipoMovimiento', 'IdTipoMovimiento');

    return this.apiService.get<Array<GestionarTransportesCircuitoDataView>>(this.apiRoute);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['tipo-documento']) { return true; }
      if (filters['nro-documento']) { return true; }
      if (filters['ctg']) { return true; }
      if (filters['tarjeta']) { return true; }
      if (filters['producto']) { return true; }
      if (filters['estado']) { return true; }
      if (filters['tipoTransporte']) { return true; }
      if (filters['Vagon']) { return true; }
      if (filters['patenteCamion']) { return true; }
      if (filters['fechaEntrada']) { return true; }
      if (filters['tipoMovimiento']) { return true; }
    }
    this.popupService.error( Resources.Messages.DebeSeleccionarAlMenosUnFiltro,
      Resources.Labels.Buscar);
    return false;
  }
}
