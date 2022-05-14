import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Entregador } from '../data-models/entregador';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class EntregadorService extends EntityWithCodeService<Entregador> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'entregadores';
  }
}
