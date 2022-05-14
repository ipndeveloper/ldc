import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class DesplegableSentidoBalanzaService extends EntityService<EntityWithDescription> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<EntityWithDescription[]> {
    return this.apiService.get<EntityWithDescription[]>('sentidos-balanza');
  }
}
