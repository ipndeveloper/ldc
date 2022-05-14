import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { VariableTemplate } from '../data-models/variable-template';

@Injectable({
  providedIn: 'root'
})
export class VariableTemplateService extends EntityService<VariableTemplate> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<VariableTemplate[]> {
    return this.apiService.get<VariableTemplate[]>('variables-template');
  }
}
