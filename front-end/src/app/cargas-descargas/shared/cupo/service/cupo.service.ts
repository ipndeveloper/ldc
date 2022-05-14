import { Injectable } from '@angular/core';
import { EntityService } from '../../../../core/shared/super/entity.service';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { EstadoVigenciaCupoDataView } from '../../../../shared/data-models/Estado-vigencia-cupo-data-view';
import { TipoProducto } from '../../../../shared/data-models/tipo-producto';
import { CodigoCupo } from '../../../../shared/data-models/codigo-cupo';
import { EstadoCupo } from '../../../../shared/data-models/estado-cupo';

@Injectable({
  providedIn: 'root'
})
export class CupoService extends EntityService<CodigoCupo> {
  private readonly apiUrl = 'codigos-cupo';
  constructor(private readonly apiService: ApiService) {
    super();
  }

  public getCupoPorCodigo(codigo: String, idMovimiento: number | null, tipoProducto: TipoProducto): Observable<CodigoCupo> {
    let query = this.apiUrl + '?codigo=' + codigo + '&idTipoProducto=' + tipoProducto.id;
    if (idMovimiento) {
      query += '&idMovimiento=' + idMovimiento;
    }

    return this.apiService.get<CodigoCupo>(query);
  }

  public getEstadoConCupo(idCodigoCupo: number, idEstadoInicial: number): Observable<EstadoVigenciaCupoDataView> {
    const query = this.apiUrl + '/estado-con-cupo-planta/' + '?idCodigoCupo=' + idCodigoCupo + '&idEstadoInicial=' + idEstadoInicial;
    return this.apiService.get<EstadoVigenciaCupoDataView>(query);
  }

  public getEstadoSinCupo(): Observable<EstadoVigenciaCupoDataView> {
    const query = this.apiUrl + '/estado-sin-cupo-planta';
    return this.apiService.get<EstadoVigenciaCupoDataView>(query);
  }

  public getEstadoInicial(idCodigoCupo: number): Observable<EstadoCupo> {
    const query = this.apiUrl + '/estado-inicial/' + '?idCodigoCupo=' + idCodigoCupo;
    return this.apiService.get<EstadoCupo>(query);
  }

}
