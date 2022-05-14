import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { EstadoViaje } from '../data-models/estado-viaje';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})

export class DesplegableEstadoViajeService extends EntityService<EstadoViaje> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EstadoViaje[]> {
    return this.apiService.get<EstadoViaje[]>('estados-viaje');
  }
}
