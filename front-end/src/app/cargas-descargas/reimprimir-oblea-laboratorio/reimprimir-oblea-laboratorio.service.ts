import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { ReimprimirObleaLaboratorioCommand } from '../../shared/data-models/commands/cargas-descargas/reimprimir-oblea-laboratorio-command';
import { ReimprimirObleaLaboratorioDataView } from '../../shared/data-models/reimprimir-oblea-laboratorio-data-view';

@Injectable()
export class ReimprimirObleaLaboratorioService {

  apiRoute = 'reimprimir-oblea-laboratorio';

  constructor(protected readonly apiService: ApiService) { }
  getMovimientoReimpresionObleaLaboratorio(numeroDocumentoPorte: string): Observable<ReimprimirObleaLaboratorioDataView> {
    const url = this.apiRoute + `?numeroDocumentoPorte=${numeroDocumentoPorte}`;

    return this.apiService.get<ReimprimirObleaLaboratorioDataView>(url);
  }

  reimprimirOblea(command: ReimprimirObleaLaboratorioCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }
}
