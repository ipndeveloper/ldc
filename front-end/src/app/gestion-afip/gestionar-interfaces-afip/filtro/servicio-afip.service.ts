import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServicioAfip } from './servicio-afip';
import { EntityService } from '../../../core/shared/super/entity.service';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable()
export class ServicioAfipService extends EntityService<ServicioAfip> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<ServicioAfip[]> {
    return this.apiService.get<ServicioAfip[]>('servicio-afip');
  }
}
