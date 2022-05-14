import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EstadoMovimiento } from '../data-models/estado-movimiento';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable()
export class EstadoMovimientoService  extends EntityService<EstadoMovimiento> {

  url = 'estado-movimiento';
  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EstadoMovimiento[]> {
    const estadosMovimiento = this.apiService.get<EstadoMovimiento[]>(this.url); // .merge();
    return estadosMovimiento;
  }

  getEstadosMovimientoByIdByIdsActividad(idTipoMovimiento?: number, idsActividad?: number[],
    traeEstadosFinales: boolean = false): Observable<EstadoMovimiento[]> {

    let queryString: string;

    queryString = '?';
    if (idTipoMovimiento) {
      queryString += 'idTipoMovimiento=' + idTipoMovimiento.toString();
    }

    if (idsActividad) {
      queryString += '&';
      queryString += Object.keys(idsActividad).map(function(key) {
        return 'idsActividad' + '=' + idsActividad[key];
      }).join('&');
    }

    if (traeEstadosFinales) {
      queryString += '&TraeEstadosNoFinales=' + traeEstadosFinales;
    }

    return this.apiService.get<EstadoMovimiento[]>(this.url + queryString)
      .pipe(
        map(datos => {
          datos.unshift({'descripcion': Resources.Labels.Todos, 'id': -1});
          return datos as EstadoMovimiento[];
        })
      );
  }
}
