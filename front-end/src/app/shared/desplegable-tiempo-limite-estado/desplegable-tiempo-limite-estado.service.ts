import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplegableTiempoLimiteEstadoService extends EntityService<EntityWithDescription> {

  private readonly apiRoute = 'tiempo-limite-estado';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EntityWithDescription[]> {
    return this.apiService.get<EntityWithDescription[]>(this.apiRoute);
  }
}
