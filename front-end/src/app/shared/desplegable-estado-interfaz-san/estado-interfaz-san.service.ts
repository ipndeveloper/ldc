import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable } from 'rxjs';
import { EstadoInterfazSan } from '../data-models/estado-interfaz-san';
import { ApiService } from '../../core/services/restClient/api.service';
import { map } from 'rxjs/operators';
import { Resources } from '../../../locale/artifacts/resources';

@Injectable({
  providedIn: 'root'
})
export class EstadoInterfazSanService extends EntityService<EstadoInterfazSan> {

  url = 'estado-interfaz-san';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EstadoInterfazSan[]> {
    return this.apiService.get<EstadoInterfazSan[]>(this.url)
      .pipe(
        map((datos: EstadoInterfazSan[]) => {
          datos.unshift({'descripcion': Resources.Labels.SinPasarASan, 'id': -1});
          return datos;
        })
      );
  }
}
