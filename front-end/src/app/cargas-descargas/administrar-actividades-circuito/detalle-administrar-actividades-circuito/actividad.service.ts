import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class ActividadService {

  constructor(private readonly api: ApiService) { }

  getAllByActividad(idActividad: number): Observable<EntityWithDescription[]> {
    return this.api.get(`actividades/resultados/${idActividad}`);
  }
}
