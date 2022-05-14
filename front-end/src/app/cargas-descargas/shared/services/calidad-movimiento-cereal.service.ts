import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ValoresCalidad } from '../../../shared/data-models/ingreso-calidad/valores-calidad';

@Injectable()
export class CalidadMovimientoCerealService {

  private readonly apiUrl = 'calidad-movimiento-cereal';

  constructor(private readonly apiService: ApiService) { }

  public getCalidadVigente(idMovimiento: number): Observable<ValoresCalidad> {
    return this.apiService.get<ValoresCalidad>(`${this.apiUrl}/${idMovimiento}`);
  }

  public getCalidadAnterior(idMovimiento: number): Observable<ValoresCalidad> {
    return this.apiService.get<ValoresCalidad>(`${this.apiUrl}/${idMovimiento}/anterior`);
  }
}
