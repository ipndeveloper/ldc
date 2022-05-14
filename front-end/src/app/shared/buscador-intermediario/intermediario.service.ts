import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Intermediario } from '../data-models/intermediario';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class IntermediarioService extends EntityWithCodeService<Intermediario> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'intermediarios';
  }
}
