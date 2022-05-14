import { Injectable } from '@angular/core';
import { TipoPesada } from '../data-models/tipo-pesada';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class TipoPesadaService extends EntityService<TipoPesada> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoPesada[]> {
    return this.apiService.get<TipoPesada[]>('tipo-pesada');
  }
}
