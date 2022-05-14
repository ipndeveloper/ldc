import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { TipoMovimiento } from '../data-models/tipo-movimiento';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class TipoMovimientoService extends EntityService<TipoMovimiento> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoMovimiento[]> {
    return this.apiService.get<TipoMovimiento[]>('tipos-movimiento');
  }
}
