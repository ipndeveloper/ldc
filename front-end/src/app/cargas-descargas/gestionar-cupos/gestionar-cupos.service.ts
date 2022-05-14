import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { GestionarCuposDataView } from '../../shared/data-models/gestionar-cupos-data-view';
import { PopupService } from '../../core/services/popupService/popup.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})

export class GestionarCuposService extends SearchFormService<Array<GestionarCuposDataView>> {


  constructor(protected readonly apiService: ApiService,
               private readonly popupService: PopupService) {
    super();
  }

  public getData(filters: Dictionary<string>): Observable<GestionarCuposDataView[]> {
    let route = `gestionar-cupos?`;

    const idEstadoMovimientoSelected = filters['estado'].id;
    if (idEstadoMovimientoSelected && idEstadoMovimientoSelected !== -1) {
      route += `&IdEstado=${idEstadoMovimientoSelected}`;
    }


    route += this.getQuerystringParameter(filters, 'fechaCupo', 'fechaCupo');
    route += this.getQuerystringParameter(filters, 'tipoDocPorte', 'idTipoDocPorte');
    route += this.getQuerystringParameter(filters, 'documentoPorte', 'nroDocPorte');
    route += this.getQuerystringParameter(filters, 'ctg', 'ctg');
    route += this.getQuerystringParameter(filters, 'producto', 'idProducto');
    route += this.getQuerystringParameter(filters, 'motivo', 'idMotivo');
    route += this.getQuerystringParameter(filters, 'codigoCupo', 'codigoCupo');
    route += this.getQuerystringParameter(filters, 'estadoCupo', 'idEstadoCupo');
    route += this.getQuerystringParameter(filters, 'turno', 'turno');

    return this.apiService.get<Array<GestionarCuposDataView>>(route);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['fechaCupo']) { return true; }
      if (filters['tipoDocPorte']) { return true; }
      if (filters['documentoPorte']) { return true; }
      if (filters['ctg']) { return true; }
      if (filters['producto']) { return true; }
      if (filters['motivo']) { return true; }
      if (filters['codigoCupo']) { return true; }
      if (filters['estadoCupo']) { return true; }
      if (filters['turno']) { return true; }
      if (filters['estado']) { return true; }

    }
    this.popupService.error(Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }
}
