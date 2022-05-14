import { Injectable } from '@angular/core';
import { Caracteristica } from '../data-models/caracteristica';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CaracteristicaService extends EntityService<Caracteristica> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Caracteristica[]> {
    return this.apiService.get<Caracteristica[]>('caracteristicas');
  }
}
