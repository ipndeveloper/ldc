import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { TipoTarjeta } from '../data-models/tipo-tarjeta';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoTarjetaService extends EntityService<TipoTarjeta> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoTarjeta[]> {
    return this.apiService.get<TipoTarjeta[]>('tipos-tarjeta');
  }
}
