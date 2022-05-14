import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Localidad } from '../data-models/localidad';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class LocalidadService extends EntityWithCodeService<Localidad> {

  constructor(protected apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'localidad';
  }
}
