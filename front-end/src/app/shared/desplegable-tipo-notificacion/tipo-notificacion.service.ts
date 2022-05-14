import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { TipoNotificacion } from '../data-models/tipo-notificacion';

@Injectable({
  providedIn: 'root'
})
export class TipoNotificacionService extends EntityService<TipoNotificacion> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoNotificacion[]> {
    return this.apiService.get<TipoNotificacion[]>('tipos-notificacion');
  }
}
