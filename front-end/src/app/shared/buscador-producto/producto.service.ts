import { Injectable } from '@angular/core';

import { Producto } from '../data-models/producto';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class ProductoService extends EntityWithCodeService<Producto> {

  constructor(protected apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'producto';
  }

  getPorCodigoPorTipoProducto(codigo: string, idTipoProducto: number): Observable<Producto | undefined> {
    const endpoint = this.apiRoute + '/' + codigo + '?idTipoProducto=' + idTipoProducto;
    return this.apiService.get(endpoint);
  }

  getSinTipo(codigo: string, filtraPorImputacionStock: boolean): Observable<Producto | undefined> {
    const endpoint = this.apiRoute + '/todos/' + codigo + '?filtraPorImputacionStock=' + filtraPorImputacionStock;
    return this.apiService.get(endpoint);
  }

  getProductosPorGrupo(idGrupo: number): Observable<Producto[]> {
    return this.apiService.get<Producto[]>(`${this.apiRoute}/grupo/${idGrupo}`);
  }

  getProductosPorTipoProducto(idTipoProducto: number): Observable<Producto[]> {
    return this.apiService.get<Producto[]>(`${this.apiRoute}/tipo-producto/${idTipoProducto}`);
  }
}
