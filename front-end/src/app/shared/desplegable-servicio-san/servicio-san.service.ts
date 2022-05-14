import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ServicioSan } from '../data-models/servicio-san';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class ServicioSanService extends EntityService<ServicioSan> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<ServicioSan[]> {
    return this.apiService.get<ServicioSan[]>('servicio-san');
  }
}
