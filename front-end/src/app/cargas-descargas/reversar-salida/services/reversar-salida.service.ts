import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ReversarSalidaCommand } from '../../../shared/data-models/commands/cargas-descargas/reversar-salida-command';

@Injectable()
export class ReversarSalidaService {

  constructor(private readonly apiService: ApiService) { }

  public reversarHaciaBalanzaEntrada(command: ReversarSalidaCommand): Observable<string> {
    return this.apiService.post<string>(`/movimientos-reversion-salida/${command.id}/reversar-hacia-balanza-entrada`, command);
  }

  public reversarHaciaBalanzaEntradaCarga(command: ReversarSalidaCommand): Observable<string> {
    return this.apiService.post<string>(`/movimientos-reversion-salida/${command.id}/reversar-hacia-balanza-entrada-carga`, command);
  }

  public reversarHaciaCalado(command: ReversarSalidaCommand): Observable<string> {
    return this.apiService.post<string>(`/movimientos-reversion-salida/${command.id}/reversar-hacia-calado`, command);
  }

  public reversarHaciaSupervisorCalado(command: ReversarSalidaCommand): Observable<string> {
    return this.apiService.post<string>(`/movimientos-reversion-salida/${command.id}/reversar-hacia-supervisor-calado`, command);
  }

  public reversarHaciaControlCalidad(command: ReversarSalidaCommand): Observable<string> {
    return this.apiService.post<string>(`/movimientos-reversion-salida/${command.id}/reversar-hacia-control-calidad`, command);
  }

  public reversarHaciaControlPatrimonial(command: ReversarSalidaCommand): Observable<string> {
    return this.apiService.post<string>(`/movimientos-reversion-salida/${command.id}/reversar-hacia-control-patrimonial`, command);
  }
}
