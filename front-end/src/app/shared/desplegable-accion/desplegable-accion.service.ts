import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Accion } from '../data-models/accion';

@Injectable({
  providedIn: 'root'
})
export class DesplegableAccionService extends EntityService<Accion> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Accion[]> {
    return this.apiService.get<Accion[]>('acciones');
  }
}
