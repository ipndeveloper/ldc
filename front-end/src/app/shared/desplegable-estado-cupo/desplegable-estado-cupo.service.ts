import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityService } from '../../core/shared/super/entity.service';
import { EstadoCupo } from '../data-models/estado-cupo';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})

export class DesplegableEstadoCupoService extends EntityService<EstadoCupo> {

  private readonly ApiUrl = 'estados-codigo-cupo';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EstadoCupo[]> {
    return this.apiService.get(this.ApiUrl);
  }

  getEstadosCupoPorIds(): Observable<EstadoCupo[]> {
    return this.apiService.get(`${this.ApiUrl}?PorIds=True`);
  }
}
