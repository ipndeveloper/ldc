import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Destinatario } from '../data-models/destinatario';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable()
export class DestinatarioService extends EntityWithCodeService<Destinatario> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'destinatarios';
  }
}
