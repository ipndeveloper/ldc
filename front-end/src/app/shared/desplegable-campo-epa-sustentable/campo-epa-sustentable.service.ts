import { Injectable } from '@angular/core';

import { CampoEpaSustentable } from '../data-models/campo-epa-sustentable';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class CampoEpaSustentableService extends EntityWithCodeService<CampoEpaSustentable> {

  constructor(protected apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'campo-epa-sustentable';
  }

  getCampoEpaSustentablePorProductoYTitular(idProducto: number,
                                            idTitular: number): Observable<CampoEpaSustentable[]> {
    return this.apiService.get<CampoEpaSustentable[]>(`${this.apiRoute}?idProducto=${idProducto}
                                                                       &idTitular=${idTitular}`);
  }
}
