import { Injectable } from '@angular/core';
import { Transportista } from '../data-models/transportista';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class FerrocarrilService extends EntityWithCodeService<Transportista> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'ferrocarriles';
  }
}

