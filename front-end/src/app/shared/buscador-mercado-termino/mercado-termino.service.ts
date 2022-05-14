import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { MercadoTermino } from '../data-models/mercado-termino';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class MercadoTerminoService extends EntityWithCodeService<MercadoTermino> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'mercado-termino';
  }
}
