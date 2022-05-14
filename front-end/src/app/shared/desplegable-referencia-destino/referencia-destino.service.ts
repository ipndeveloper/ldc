import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ReferenciaDestino } from '../data-models/referencia-destino';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ReferenciaDestinoService extends EntityService<ReferenciaDestino> {

    constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<ReferenciaDestino[]> {
    return this.apiService.get<ReferenciaDestino[]>('ubicaciones-playa-estacionamiento');
  }
}
