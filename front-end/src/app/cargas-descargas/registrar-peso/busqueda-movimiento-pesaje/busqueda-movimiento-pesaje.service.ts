import { Injectable } from '@angular/core';
import { MovimientoPesaje } from '../movimiento-pesaje';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable()
export class BusquedaMovimientoPesajeService {

  constructor(private readonly apiService: ApiService) { }

  public getMovimientoPesajeCamion(patenteCamion: string, tarjeta: string): Observable<MovimientoPesaje> {

    const url = `movimiento-pesaje-camion?patente=${patenteCamion}&tarjeta=${tarjeta}`;

    return this.apiService.get<MovimientoPesaje>(url);
  }

  public getMovimientoPesajeCamionById(idMovimiento: number): Observable<MovimientoPesaje> {
    const url = `movimiento-pesaje-camion/${idMovimiento}/por-navegacion`;
    return this.apiService.get<MovimientoPesaje>(url);
  }

  public getMovimientoPesajeVagonById(idMovimiento: number): Observable<MovimientoPesaje> {
    const url = `movimiento-pesaje-vagon/${idMovimiento}/por-navegacion`;
    return this.apiService.get<MovimientoPesaje>(url);
  }

  public getMovimientoPesajeVagon(numeroVagon: string, tarjeta?: string): Observable<MovimientoPesaje> {

    let url = `movimiento-pesaje-vagon?numeroVagon=${numeroVagon}`;

    if (tarjeta) {
      url += `&tarjeta=${tarjeta}`;
    }

    return this.apiService.get<MovimientoPesaje>(url);
  }

}
