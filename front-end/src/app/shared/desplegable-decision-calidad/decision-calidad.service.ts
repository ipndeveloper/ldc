import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { DecisionCalidad } from '../data-models/decision-calidad';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DecisionCalidadService extends EntityService<DecisionCalidad> {

  url = 'decision-calidad';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<DecisionCalidad[]> {
    return this.apiService.get<DecisionCalidad[]>(this.url);
  }
}
