import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { DispositivoCaladoDataView } from '../../shared/data-models/dispositivo-calado-data-view';
import { MedicionesRubrosCalidadDataView } from '../../shared/data-models/mediciones-rubros-calidad-data-view';

const apiUrl = 'calados';

@Injectable()
export class CaladoService {

  constructor(private readonly apiService: ApiService) { }

  getDispositivoRubrosCalidad(idProducto: number): Observable<DispositivoCaladoDataView> {
    const url = `${apiUrl}/dispositivo-rubros-automaticos?idProducto=${idProducto}`;
    return this.apiService.get<DispositivoCaladoDataView>(url);
  }

  medirRubrosCalidad(idProducto: number, idMovimiento: number,
                      idTipoMovimiento: number, numeroTarjeta?: string): Observable<MedicionesRubrosCalidadDataView> {
    let url = `${apiUrl}/actual/medir-rubros-calidad?`;
    url += `idProducto=${idProducto}&idMovimiento=${idMovimiento}&idTipoMovimiento=${idTipoMovimiento}`;

    if (numeroTarjeta) {
      url += `&numeroTarjeta=${numeroTarjeta}`;
    }

    return this.apiService.get<MedicionesRubrosCalidadDataView>(url);
  }
}
