import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { PesoRegistrado } from '../../registrar-peso/peso-registrado';

@Injectable({
  providedIn: 'root'
})

export class BalanzaService {

  private readonly apiUrl = 'balanzas/actual';

  constructor(private readonly apiService: ApiService) { }

  public habilitarBalanza(sentido: boolean) {
    return this.apiService.post(`${this.apiUrl}/habilitar-ingreso`, { sentidoEntrada: sentido });
  }

  public liberarBalanza(idMovimiento: number, sentido: boolean) {
    return this.apiService.post(`${this.apiUrl}/liberar`, { idMovimiento, sentido });
  }

  public tomarPeso(idMovimiento: number, tarjeta: string, patente: string, idAccion: number): Observable<PesoRegistrado> {
    const url = `${this.apiUrl}/tomar-peso?idMovimiento=${idMovimiento}&tarjeta=${tarjeta}&patente=${patente}&idAccion=${idAccion}`;
    return this.apiService.get(url);
  }
}
