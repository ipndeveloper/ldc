import { Injectable } from '@angular/core';
import { SearchFormService } from '../../../core/components/search-form/services/search-form.service';
import { MovimientoReversionSalida } from '../../../shared/data-models/movimiento-reversion-salida';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { EstadoMovimiento } from '../../../shared/data-models/estado-movimiento';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Injectable()
export class SearchReversarSalidaService extends SearchFormService<Array<MovimientoReversionSalida>> {

  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'movimientos-reversion-salida';
  }

  public getData(filters: Dictionary<string>): Observable<MovimientoReversionSalida[]> {
    let query = this.apiRoute + '?';

    if (filters['tipoTransporte']) {
      query += `idTipoTransporte=${filters['tipoTransporte'].id}&`;
    }

    if (filters['tipoMovimiento']) {
      query += `idTipoMovimiento=${filters['tipoMovimiento'].id}&`;
    }

    if (filters['patente']) {
      query += `patente=${filters['patente']}&`;
    }

    if (filters['producto']) {
      query += `idProducto=${filters['producto'].id}&`;
    }

    if (filters['tipoDocumentoPorte']) {
      query += `idTipoDocumentoPorte=${filters['tipoDocumentoPorte'].id}&`;
    }

    if (filters['numeroDocumentoPorte']) {
      query += `numeroDocumentoPorte=${filters['numeroDocumentoPorte']}&`;
    }

    if (filters['ctg']) {
      query += `ctg=${filters['ctg']}&`;
    }

    if (filters['numeroVagon']) {
      query += `numeroVagon=${filters['numeroVagon']}&`;
    }

    const idEstado = filters['idEstado'];

    if (idEstado && idEstado === -1) {
      const allEstadoMovimiento = filters['allEstadoMovimiento'];
      query += Object.keys(allEstadoMovimiento)
            .map(key => 'IdsEstadoMovimiento=' + (allEstadoMovimiento[key] as EstadoMovimiento).id).join('&');
    } else {
      query += 'IdsEstadoMovimiento=' + idEstado;
    }

    return this.apiService.get<Array<MovimientoReversionSalida>>(query);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getResultadosParaReversar(idMovimiento: number): Observable<EntityWithDescription[]> {
    return this.apiService.get(`${this.apiRoute}/${idMovimiento}`);
  }
}
