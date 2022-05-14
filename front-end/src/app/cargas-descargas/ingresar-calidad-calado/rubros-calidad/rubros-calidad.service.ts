import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { RubroCalidadMovimientoCereal } from '../../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';
import { Observable } from 'rxjs';
import { Rubro } from '../../../shared/data-models/rubro';

@Injectable()
export class RubrosCalidadService {
  private readonly apiUrl = 'rubros-calidad';

  constructor(private readonly apiService: ApiService) { }

  getRubrosCalidad(idProducto: number): Observable<RubroCalidadMovimientoCereal[]> {
    const url = `${this.apiUrl}?idProducto=${idProducto}`;

    return this.apiService.get<RubroCalidadMovimientoCereal[]>(url);
  }

  getPorIdProducto(idProducto: number): Observable<Rubro[]> {
    const url = `${this.apiUrl}/producto/${idProducto}`;

    return this.apiService.get<Rubro[]>(url);
  }

  getAll(): Observable<Rubro[]> {
    return this.apiService.get<Rubro[]>(`${this.apiUrl}/todos`);
  }
}
