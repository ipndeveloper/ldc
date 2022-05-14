import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { RegistrarPesajeCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-pesaje-command';

@Injectable()
export class RegistrarPesadaService {
  constructor(private readonly apiService: ApiService) { }

  Registrar(comando: RegistrarPesajeCommand): Observable<string>  {
    return this.apiService.post<string>('/movimiento-pesaje-camion', comando);
  }
}
