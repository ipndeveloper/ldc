import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { PuntoCarga } from '../data-models/punto-carga';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplegablePuntoCargaService extends EntityService<PuntoCarga> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<PuntoCarga[]> {
    return this.apiService.get<PuntoCarga[]>('punto-carga');
  }
}
