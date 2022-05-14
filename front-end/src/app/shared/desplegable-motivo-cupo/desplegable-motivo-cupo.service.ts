import { Injectable } from '@angular/core';
import { MotivoCupo } from '../data-models/motivo-cupo';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Finalidad } from '../data-models/finalidad';

@Injectable({
  providedIn: 'root'
})
export class DesplegableMotivoCupoService extends EntityService<MotivoCupo> {
  constructor(private readonly apiService: ApiService) {
    super();
  }

  getMotivoPorFinalidad(finalidad: Finalidad): Observable<MotivoCupo[]> {
    return this.apiService.get<MotivoCupo[]>(`motivo-cupo?idFinalidad=${finalidad.id}`);
  }
}
