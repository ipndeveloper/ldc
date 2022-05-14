import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { RegistrarDecisionEntregadorCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-decision-entregador-command';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrarDecisionEntregadorService {

  apiRoute = '/gestionar-descargas-entregador/';

  constructor(protected readonly apiService: ApiService) {
  }

  public registrarDecisionEntregador(command: RegistrarDecisionEntregadorCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }
}
