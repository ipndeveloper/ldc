import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { PermisoPadreHijoDataView } from '../data-models/permiso-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplegablePermisoService extends EntityService<PermisoPadreHijoDataView> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<PermisoPadreHijoDataView[]> {
    return this.apiService.get<PermisoPadreHijoDataView[]>('permisos/padre-hijo');
  }
}
