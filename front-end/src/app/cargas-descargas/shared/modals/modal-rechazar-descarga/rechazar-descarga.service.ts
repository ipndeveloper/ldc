import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { RechazarDescargaCommand } from '../../../../shared/data-models/commands/cargas-descargas/rechazar-descarga-command';

@Injectable()
export class RechazarDescargaService {

  constructor(private readonly apiService: ApiService) { }

  rechazarDescarga(idDescarga: number, observaciones?: string): Observable<void> {

    const url = `movimientos/${idDescarga}/rechazar`;
    const command = new RechazarDescargaCommand(idDescarga, observaciones);

    return this.apiService.post(url, command);
  }
}
