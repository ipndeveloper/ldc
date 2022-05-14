import { Injectable } from '@angular/core';
import { EstadoMuestra } from '../data-models/estado-muestra';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from '../../core/services/restClient/api.service';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable()
export class EstadoMuestraService extends EntityService<EstadoMuestra> {

  constructor(private readonly apiService: ApiService) { super(); }

  getAll(): Observable<EstadoMuestra[]> {
    return this.apiService.get<EstadoMuestra[]>('estados-muestra')
      .pipe(
        map(datos => {
          datos.unshift({'descripcion': Resources.Labels.Todos, 'id': -1});
          return datos as EstadoMuestra[];
        })
      );
  }
}
