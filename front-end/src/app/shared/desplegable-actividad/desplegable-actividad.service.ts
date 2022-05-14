import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Actividad } from '../data-models/actividad';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DesplegableActividadService extends EntityService<Actividad> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Actividad[]> {
    return this.apiService.get<Actividad[]>('actividades');
  }

  public get(idCircuito): Observable<Actividad[]> {
    return this.apiService.get<Actividad[]>(`circuitos/actividades/${idCircuito}`);
  }
}
