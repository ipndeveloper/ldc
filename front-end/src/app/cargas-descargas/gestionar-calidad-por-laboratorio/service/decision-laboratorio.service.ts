import { Injectable } from '@angular/core';
import { EntityService } from '../../../core/shared/super/entity.service';
import { DecisionLaboratorio } from '../decision-laboratorio';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class DecisionLaboratorioService extends EntityService<DecisionLaboratorio> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<DecisionLaboratorio[]> {
    return this.apiService.get<DecisionLaboratorio[]>('decision-laboratorio');
  }
}
