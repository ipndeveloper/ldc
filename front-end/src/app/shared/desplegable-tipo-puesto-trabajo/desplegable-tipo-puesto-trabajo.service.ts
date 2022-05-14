import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { TipoPuestoTrabajo } from '../data-models/tipo-puesto-trabajo';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoPuestoTrabajoService extends EntityService<TipoPuestoTrabajo> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoPuestoTrabajo[]> {
    return this.apiService.get<TipoPuestoTrabajo[]>('tipos-puestos-trabajo');
  }
}
