import { Injectable } from '@angular/core';

import { Sede } from '../data-models/sede';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Dictionary } from '../../core/models/dictionary';

@Injectable()
export class BuscadorSedeService extends EntityWithCodeService<Sede> {

  esCarga = false;
  idSedeOrigenCarga?: number;
  idFinalidad?: number;
  esOrigen = false;

  constructor(protected apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'sede';
  }

  getSede(codigo: string, esOrigen: boolean): Observable<Sede> {
    if (!esOrigen && this.esCarga) {
      const filters = new Dictionary<string>();
      filters['codigo'] = codigo;
      filters['esCarga'] = this.esCarga;
      filters['idSedeOrigenCarga'] = this.idSedeOrigenCarga;
      filters['idFinalidad'] = this.idFinalidad;
      return this.apiService.get<Sede>(`${this.apiRoute}/codigo?${filters.queryfy()}`);
    }
    return this.apiService.get<Sede>(this.apiRoute + '/' + codigo);
  }
}
