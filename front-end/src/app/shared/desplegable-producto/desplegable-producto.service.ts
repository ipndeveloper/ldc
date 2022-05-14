import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { DesplegableProducto } from './desplegable-producto';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplegableProductoService extends EntityService<DesplegableProducto> {

  constructor(private apiService: ApiService) {
    super();
  }

  getAll(): Observable<DesplegableProducto[]> {
    return this.apiService.get('producto');
  }
}
