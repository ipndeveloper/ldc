import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { IntermediarioFlete } from '../data-models/intermediario-flete';

@Injectable()
export class IntermediarioFleteService extends EntityWithCodeService<IntermediarioFlete> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'intermediarios-flete';
  }
}
