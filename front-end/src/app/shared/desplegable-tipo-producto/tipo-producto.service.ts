import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { TipoProducto } from '../data-models/tipo-producto';

@Injectable()
export class TipoProductoService extends EntityService<TipoProducto> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<TipoProducto[]> {
    return this.apiService.get<TipoProducto[]>('tipos-producto');
  }

  getSubproductos(): Observable<TipoProducto[]> {
    return this.apiService.get<TipoProducto[]>('tipos-producto?esSubproductos=true');
  }

  getInsumosVarios(): Observable<TipoProducto[]> {
    return this.apiService.get<TipoProducto[]>('tipos-producto?esInsumosVarios=true');
  }

  getConCupo(): Observable<TipoProducto[]> {
    return this.apiService.get<TipoProducto[]>('tipos-producto?esCupo=true');
  }
}
