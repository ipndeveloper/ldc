import { Injectable } from '@angular/core';
import { SearchFormService } from '../../../core/components/search-form/services/search-form.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { ReimprimirTicketPesajeDataView } from '../../../shared/data-models/reimprimir-ticket-pesaje-data-view';

@Injectable()
export class SearchMovimientosReimpresionTicketPesajeService extends SearchFormService<Array<ReimprimirTicketPesajeDataView>> {

  apiRoute: string;

  constructor(protected readonly apiService: ApiService,
              private readonly popupService: PopupService) {
    super();
    this.apiRoute = 'reimprimir-ticket-pesaje';
  }

  public getData(filters: Dictionary<string>): Observable<Array<ReimprimirTicketPesajeDataView>> {


    let query = this.apiRoute + '?tipoDocPorte=';

    if (filters['tipoDocPorte']) {
      query += filters['tipoDocPorte'].id;
    }

    if (filters['nroDocPorte']) {
      query += '&nroDocPorte=' + filters['nroDocPorte'];
    }

    if (filters['patente']) {
      query += '&patente=' + filters['patente'];
    }

    if (filters['nroTicket']) {
      query += '&nroTicket=' + filters['nroTicket'];
    }

    if (filters['numeroVagon']) {
      query += '&numeroVagon=' + filters['numeroVagon'];
    }

    if (filters['ctg']) {
      query += '&ctg=' + filters['ctg'];
    }

    return this.apiService.get<Array<ReimprimirTicketPesajeDataView>>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      if (filters['tipoDocPorte']) { return true; }
      if (filters['nroDocPorte']) { return true; }
      if (filters['nroTicket']) { return true; }
      if (filters['patente']) { return true; }
      if (filters['numeroVagon']) { return true; }
    }
    this.popupService.error( Resources.Messages.DebeSeleccionarAlMenosUnFiltro, Resources.Labels.Buscar);
    return false;
  }
}

