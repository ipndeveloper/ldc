import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { EstadoOrdenCarga } from '../data-models/estado-orden-carga';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class DesplegableEstadoOrdenCargaService extends EntityService<EstadoOrdenCarga> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EstadoOrdenCarga[]> {
    return this.apiService.get<EstadoOrdenCarga[]>('estados-orden-carga');
  }
}

