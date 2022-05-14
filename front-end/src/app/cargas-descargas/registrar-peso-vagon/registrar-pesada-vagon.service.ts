import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { RegistrarPesajeVagonCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-pesaje-vagon-command';

@Injectable({
  providedIn: 'root'
})
export class RegistrarPesadaVagonService {
  constructor(private readonly apiService: ApiService) { }

  Registrar(comando: RegistrarPesajeVagonCommand): Observable<string>  {
    return this.apiService.post<string>('/movimiento-pesaje-vagon', comando);
  }
}
