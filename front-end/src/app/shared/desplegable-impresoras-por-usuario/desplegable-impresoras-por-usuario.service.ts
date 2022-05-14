import { Injectable } from '@angular/core';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { EntityService } from '../../core/shared/super/entity.service';

@Injectable({
  providedIn: 'root'
})

export class DesplegableImpresorasPorUsuarioService
     extends EntityService<EntityWithDescription> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EntityWithDescription[]> {
    return this.apiService.get<EntityWithDescription[]>(`impresoras/usuario`);
  }
}
