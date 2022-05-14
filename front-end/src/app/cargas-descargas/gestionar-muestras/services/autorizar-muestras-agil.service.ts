import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { AutorizarMuestraAgilCommand } from '../../../shared/data-models/commands/cargas-descargas/autorizar-muestra-agil-command';

@Injectable()
export class AutorizarMuestrasAgilService {

  constructor(private readonly apiService: ApiService) { }

  public autorizar(command: AutorizarMuestraAgilCommand): Observable<string> {
    return this.apiService.post<string>('/autorizar-muestras', command);
  }

}
