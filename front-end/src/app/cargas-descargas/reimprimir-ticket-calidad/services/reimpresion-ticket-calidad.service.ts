import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ReimprimirTicketCalidadDataView } from '../../../shared/data-models/reimprimir-ticket-calidad-data-view';
import { ReimprimirTicketCalidadCommand } from '../../../shared/data-models/commands/cargas-descargas/reimprimir-ticket-calidad-command';

@Injectable()
export class ReimpresionTicketCalidadService  {

  apiRoute = `reimprimir-ticket-calidad`;

  constructor(protected readonly apiService: ApiService) {
  }

  getMovimientoReimpresionCalidad(patente: string,
                                  vagon: string,
                                  tarjeta: number,
                                  turno: string): Observable<ReimprimirTicketCalidadDataView> {
    const url = this.apiRoute + `?patente=${patente}&vagon=${vagon}&tarjeta=${tarjeta}&turno=${turno}`;

    return this.apiService.get<ReimprimirTicketCalidadDataView>(url);
  }

  reimprimirTicket(command: ReimprimirTicketCalidadCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }
}

