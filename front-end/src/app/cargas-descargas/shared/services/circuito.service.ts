import { Injectable } from '@angular/core';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable()
export class CircuitoService {

  constructor(private readonly apiService: ApiService) { }

  public getCircuito(idTipoMovimiento: number,
                     idTipoTransporte: number,
                     idTipoProducto: number,
                     idsActividad: number[]): Observable<Circuito> {
    const actividades = idsActividad.map((id: number) => {
      return `idsActividad=${id}`;
    }).join('&');

    const url = `circuitos?idTipoMovimiento=${idTipoMovimiento}&` +
                          `idTipoTransporte=${idTipoTransporte}&` +
                          `idTipoProducto=${idTipoProducto}&` +
                          `${actividades}`;

    return this.apiService.get<Circuito>(url);
  }

  public getCircuitoByIdByIdsActividad(id: number, idsActividad: number[]): Observable<Circuito> {

    const queryString = Object.keys(idsActividad).map(function(key) {
      return 'idsActividad' + '=' + idsActividad[key];
    }).join('&');
    const url = 'circuitos/' + `${id}` + '?' + queryString;

    return this.apiService.get<Circuito>(url);
  }
}
