import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { EstadoTrabajoGeneracionArchivoMuestra } from '../data-models/estado-trabajo-generacion-archivo-muestra';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable()
export class EstadoTrabajoGeneracionArchivoMuestrasService extends EntityService<EstadoTrabajoGeneracionArchivoMuestra> {

  constructor(private readonly apiService: ApiService) { super(); }

  getAll(): Observable<EstadoTrabajoGeneracionArchivoMuestra[]> {
    return this.apiService.get<EstadoTrabajoGeneracionArchivoMuestra[]>('estados-trabajo-generacion-archivo-muestras')
      .pipe(
        map(datos => {
          datos.unshift({'descripcion': Resources.Labels.Todos, 'id': -1});
          return datos as EstadoTrabajoGeneracionArchivoMuestra[];
        })
      );
  }
}
