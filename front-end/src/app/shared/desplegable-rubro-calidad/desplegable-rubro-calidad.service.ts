import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplegableRubroCalidadService  extends EntityService<EntityWithDescription> {

  constructor(private apiService: ApiService) {
    super();
  }

  getAll(): Observable<EntityWithDescription[]> {
    return this.apiService.get('rubros-calidad/todos');
  }

  getRubrosPorProducto(idProducto: number): Observable<EntityWithDescription[]> {
    return this.apiService.get(`rubros-calidad/producto/${idProducto}`);
  }
}
