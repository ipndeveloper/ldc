import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { TipoEvento } from '../data-models/tipo-evento';

@Injectable({
  providedIn: 'root'
})

export class DesplegableEventoService extends EntityService<TipoEvento> {

  readonly apiRoute = 'tipo-eventos';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoEvento[]> {
    return this.apiService.get<TipoEvento[]>(this.apiRoute);
  }

}
