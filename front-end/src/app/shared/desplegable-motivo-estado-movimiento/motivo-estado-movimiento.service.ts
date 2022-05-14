import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { MotivoEstadoMovimiento } from '../data-models/motivo-estado-movimiento';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class MotivoEstadoMovimientoService extends EntityService<MotivoEstadoMovimiento> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<MotivoEstadoMovimiento[]> {
    return this.apiService.get<MotivoEstadoMovimiento[]>('motivos-estado-movimiento');
  }
}
