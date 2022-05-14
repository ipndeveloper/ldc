import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { TipoCartaPorte } from '../data-models/tipo-carta-porte';

@Injectable()
export class TipoCartaPorteService extends EntityService<TipoCartaPorte> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoCartaPorte[]> {
    return this.apiService.get<TipoCartaPorte[]>('tipo-carta-porte');
  }
}
