import { Injectable } from '@angular/core';
import { ReimprimirTurnoPlayaDataView } from '../../shared/data-models/reimprimir-turno-playa-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ReimprimirTurnoPlayaCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-turno-playa-command';

@Injectable({
  providedIn: 'root'
})

export class ReimprimirTurnoPlayaService {

  private readonly apiRoute = `reimprimir-turno-playa`;

  constructor(protected readonly apiService: ApiService) {
  }

  get(tipoDocumentoPorte: string, numeroDocumentoPorte: string | null,
      ctg: number | null,
      idVendedor: number | null): Observable<ReimprimirTurnoPlayaDataView> {
    let url = `${this.apiRoute}?tipoDocumentoPorte=${tipoDocumentoPorte}`;

    if (numeroDocumentoPorte) {
      url += `&numeroDocumentoPorte=${numeroDocumentoPorte}`;
    }

    if (ctg) {
      url += `&ctg=${ctg}`;
    }

    if (idVendedor) {
      url += `&IdVendedor=${idVendedor}`;
     }

    return this.apiService.get<ReimprimirTurnoPlayaDataView>(url);
  }

  reimprimirTurnoPlaya(command: ReimprimirTurnoPlayaCommand): Observable<void> {
    return this.apiService.post<void>(this.apiRoute, command);
  }
}
