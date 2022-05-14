import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { Grado } from '../data-models/grado';

@Injectable()
export class GradoService extends EntityService<Grado> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Grado[]> {
    return this.apiService.get<Grado[]>('grados');
  }
}
