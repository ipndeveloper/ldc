import { Injectable } from '@angular/core';
import { Titular } from '../data-models/titular';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class TitularService extends EntityWithCodeService<Titular> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'titulares';
  }
}
