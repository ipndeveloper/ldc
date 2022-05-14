import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ReimprimirTicketPesajeCommand } from '../../../shared/data-models/commands/cargas-descargas/reimprimir-ticket-pesaje-command';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable()
export class ReimprimirTicketPesajeService {

  apiRoute = '/reimprimir-ticket-pesaje/';

  constructor(protected readonly apiService: ApiService) {
  }

  public reimprimirTicket(command: ReimprimirTicketPesajeCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }

}
