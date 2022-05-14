import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { TipoGrano } from '../data-models/tipo-grano';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class TipoGranoService extends EntityService<TipoGrano> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoGrano[]> {
    return this.apiService.get<TipoGrano[]>('tipo-grano');
  }
}
