import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { TipoDispositivo } from '../data-models/tipo-dispositivo';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TiposDispositivoService extends EntityService<TipoDispositivo> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoDispositivo[]> {
    return this.apiService.get<TipoDispositivo[]>('tipos-dispositivo');
  }
}
