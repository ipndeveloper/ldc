import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { PuestoTrabajo } from '../data-models/puesto-trabajo';

@Injectable({
  providedIn: 'root'
})
export class PuestoTrabajoService extends EntityService<PuestoTrabajo> {

  constructor(private readonly apiService: ApiService) {
    super();
  }
  getAll(): Observable<PuestoTrabajo[]> {
    return this.apiService.get<PuestoTrabajo[]>('puesto-trabajo');
  }
}
