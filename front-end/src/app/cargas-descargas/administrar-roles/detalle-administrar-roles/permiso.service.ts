import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { PermisoDataView } from '../../../shared/data-models/permiso-data-view';

@Injectable({
  providedIn: 'root'
})
export class PermisoService {

  constructor(private readonly api: ApiService) { }

  getAll(): Observable<PermisoDataView[]> {
    return this.api.get<PermisoDataView[]>('permisos');
  }
}
