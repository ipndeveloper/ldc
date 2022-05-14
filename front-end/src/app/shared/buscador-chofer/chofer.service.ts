import { Injectable } from '@angular/core';

import { Chofer } from '../data-models/chofer';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ChoferService extends EntityWithCodeService<Chofer> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'choferes';
  }

  get(codigo: string): Observable<Chofer> {
    return this.apiService.get<Chofer>(this.apiRoute + '/codigo?cuil=' + codigo);
  }

  getByRazonSocial(razonSocial: string): Chofer[] {
    return this.entities.filter(e => e.descripcion && e.descripcion.toLowerCase().indexOf(razonSocial.toLowerCase()) > -1 );
  }
}
