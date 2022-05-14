import { Injectable } from '@angular/core';
import { SinRespuestaEntregadorCommand } from '../../../../shared/data-models/commands/cargas-descargas/sin-respuesta-entregador-command';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/restClient/api.service';

@Injectable()
export class GestionarCalidadCaladoService {

  apiRoute = '/gestionar-calidad-calado/';

  constructor(protected readonly apiService: ApiService) {
  }

  public sinRespuestaEntregador(command: SinRespuestaEntregadorCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }

}
