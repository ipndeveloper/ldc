import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { EntityWithCode } from '../../core/models/entity-with-code';

@Injectable({
  providedIn: 'root'
})
export class BuscadorSociedadService extends EntityWithCodeService<EntityWithCode> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'titulares';
  }
}
