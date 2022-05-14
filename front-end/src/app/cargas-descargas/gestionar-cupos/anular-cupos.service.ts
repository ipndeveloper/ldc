import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { AnularCupoCommand } from '../../shared/data-models/commands/cargas-descargas/anular-cupo-command';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AnularCuposService {

  apiRoute = '/gestionar-cupos/';

  constructor(protected readonly apiService: ApiService) {
  }

  public registrarAnulacion(command: AnularCupoCommand): Observable<string> {
    return this.apiService.post<string>(this.apiRoute, command);
  }
}
