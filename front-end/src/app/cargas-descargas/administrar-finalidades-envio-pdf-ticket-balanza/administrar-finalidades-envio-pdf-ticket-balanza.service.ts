import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';
import { AdministrarFinalidadesEnvioPdfTicketPesajeDataView } from '../../shared/data-models/administrar-finalidades-envio-pdf-ticket-pesaje-data-view';
import { CrearFinalidadesEnvioPdfTicketBalanzaCommand, FinalidadesEnvioPdfTicketBalanzaCommand, ModificarFinalidadesEnvioPdfTicketBalanzaCommand } from '../../shared/data-models/commands/cargas-descargas/finalidades-envio-pdf-ticket-balanza-command';
import { FinalidadesEnvioPdfTicketBalanzaDataView } from '../../shared/data-models/finalidades-envio-pdf-ticket-balanza-data-view copy';

@Injectable({
  providedIn: 'root'
})
export class AdministrarFinalidadesEnvioPdfTicketBalanzaService
  extends AdministrableFormService<Array<AdministrarFinalidadesEnvioPdfTicketPesajeDataView>,
                                   FinalidadesEnvioPdfTicketBalanzaCommand,
                                   CrearFinalidadesEnvioPdfTicketBalanzaCommand,
                                   ModificarFinalidadesEnvioPdfTicketBalanzaCommand,
                                   FinalidadesEnvioPdfTicketBalanzaDataView> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'finalidades-envio-pdf-ticket-balanza';
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarFinalidadesEnvioPdfTicketPesajeDataView[]> {
    let query = `${this.apiRoute}/filtros?`;

    query += this.getQuerystringParameter(filters, 'circuito', 'idCircuito');
    query += this.getQuerystringParameter(filters, 'finalidad', 'idFinalidad');
    query += this.getQuerystringParameter(filters, 'estaHabilitado');

    return this.apiService.get<AdministrarFinalidadesEnvioPdfTicketPesajeDataView[]>(query);
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      return true;
    }
    return false;
  }
}
