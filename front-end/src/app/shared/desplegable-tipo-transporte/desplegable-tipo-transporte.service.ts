import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable } from 'rxjs';
import { TipoTransporte } from '../data-models/tipo-transporte';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class TipoTransporteService extends EntityService<TipoTransporte> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(soloCamionYTren: boolean = false): Observable<TipoTransporte[]> {
    return this.apiService.get<TipoTransporte[]>(`tipo-transporte?soloCamionYTren=${soloCamionYTren}`);
  }
}
