import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { Corredor } from '../data-models/corredor';
import { Observable } from 'rxjs';

@Injectable()
export class CorredorService extends EntityWithCodeService<Corredor> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'corredores';
  }

  getByCodigoRol(codigo: string, rol: string): Observable<Corredor> {
    return this.apiService.get(`${this.apiRoute}/codigoFiscal?codigoFiscal=${codigo}&rol=${rol}`);
  }
}
