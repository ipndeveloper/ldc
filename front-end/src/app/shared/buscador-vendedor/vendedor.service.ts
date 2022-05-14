import { Injectable } from '@angular/core';
import { Vendedor } from '../data-models/vendedor';
import { ApiService } from '../../core/services/restClient/api.service';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Observable } from 'rxjs';

@Injectable()
export class VendedorService extends EntityWithCodeService<Vendedor> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'vendedores';
  }

  getByCodigoRol(codigo: string, rol: string): Observable<Vendedor> {
    return this.apiService.get(`${this.apiRoute}/codigoFiscal?codigoFiscal=${codigo}&rol=${rol}`);
  }
}
