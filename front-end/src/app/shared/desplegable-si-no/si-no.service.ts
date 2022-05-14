import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Observable, of } from 'rxjs';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Resources } from '../../../locale/artifacts/resources';
import { OpcionesSiNo } from '../enums/enums';

@Injectable({
  providedIn: 'root'
})
export class SiNoService extends EntityService<EntityWithDescription> {

  getAll(): Observable<EntityWithDescription[]> {
    return of([
      {id: -1, descripcion: Resources.Labels.Todos},
      {id: OpcionesSiNo.Si, descripcion: 'Si'},
      {id: OpcionesSiNo.No, descripcion: 'No'},
    ]);
  }
}
