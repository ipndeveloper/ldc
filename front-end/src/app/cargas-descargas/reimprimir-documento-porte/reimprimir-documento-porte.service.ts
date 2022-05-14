import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ReimprimirDocumentoPorteDataView } from '../../shared/data-models/reimprimir-documento-porte-data-view';
import { ReimprimirDocumentoPorteCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-documento-porte-command';

@Injectable({
  providedIn: 'root'
})
export class ReimprimirDocumentoPorteService {

  apiRoute = 'reimprimir-documento-porte';

  constructor(protected readonly apiService: ApiService) {
  }

  public get(IdTipoDocumentoPorte: number, numeroDocumentoPorte: string, ctg?: number)
  : Observable<ReimprimirDocumentoPorteDataView> {
    let url = `${this.apiRoute}?IdTipoDocumentoPorte=${IdTipoDocumentoPorte}`;
    url += `&numeroDocumentoPorte=${numeroDocumentoPorte}`;
    url += `&ctg=${ctg}`;

    return this.apiService.get<ReimprimirDocumentoPorteDataView>(url);
  }

  public reimprimirTicket(command: ReimprimirDocumentoPorteCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }


}
