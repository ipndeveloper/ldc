import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { EntityService } from '../../core/shared/super/entity.service';
import { Rol } from '../data-models/rol';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService extends EntityService<Rol> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Rol[]> {
    return this.apiService.get<Rol[]>('roles');
  }

  getAllHabilitados(): Observable<Rol[]> {
    return this.apiService.get<Rol[]>('roles/filtros?habilitado=true');
  }
}
