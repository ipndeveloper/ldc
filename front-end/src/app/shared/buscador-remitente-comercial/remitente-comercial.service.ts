import { Injectable } from '@angular/core';
import { RemitenteComercial } from '../data-models/remitente-comercial';
import { ApiService } from '../../core/services/restClient/api.service';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';

@Injectable()
export class RemitenteComercialService extends EntityWithCodeService<RemitenteComercial> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'remitentes-comerciales';
  }
}
