import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { EstadoMovimientoSan } from '../../shared/data-models/gestionar-movimientos/estado-movimiento-san';
import { StockAbiertoMovimientoSan } from '../../shared/data-models/gestionar-movimientos/stock-abierto-movimiento-san';

@Injectable()
export class ConsultaSanService {

  private readonly apiUrl = 'movimientos-san';

  constructor(private readonly apiService: ApiService) { }

  public leerEstadoDeMovimientoEnSan(idMovimiento: number): Observable<EstadoMovimientoSan> {
      return this.apiService.get<EstadoMovimientoSan>(`${this.apiUrl}/${idMovimiento}/estado`);
  }

  public leerEstadoDeStockEnSan(idMovimiento: number): Observable<StockAbiertoMovimientoSan> {
    return this.apiService.get<StockAbiertoMovimientoSan>(`${this.apiUrl}/${idMovimiento}/stock-abierto`);
  }
}
