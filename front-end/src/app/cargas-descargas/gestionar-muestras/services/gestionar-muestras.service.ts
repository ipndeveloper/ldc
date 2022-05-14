import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { CambiarCodigoBarrasMuestraCommand } from '../../../shared/data-models/commands/cargas-descargas/cambiar-codigo-barras-muestra-command';

@Injectable()
export class GestionarMuestrasService {

  constructor(private readonly apiService: ApiService) { }

  public descartar(id: number): Observable<string> {
    return this.apiService.post<string>(`/gestionar-muestras/${id}/descartar`, id);
  }

  public autorizar(id: number): Observable<string> {
    return this.apiService.post<string>(`/gestionar-muestras/${id}/autorizar`, id);
  }

  public reversarEstado(id: number): Observable<string> {
    return this.apiService.post<string>(`/gestionar-muestras/${id}/reversar-estado`, id);
  }

  public cambiarCodigoBarras(command: CambiarCodigoBarrasMuestraCommand): Observable<string> {
    return this.apiService.post<string>(`/gestionar-muestras/${command.id}/cambiar-codigo-barras`, command);
  }
}
