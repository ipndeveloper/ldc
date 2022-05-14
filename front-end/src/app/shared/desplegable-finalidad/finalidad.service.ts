import { Injectable } from '@angular/core';
import { Finalidad } from '../data-models/finalidad';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class FinalidadService extends EntityService<Finalidad> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getFinalidadesPorCircuito(idCircuito: number): Observable<Finalidad[]> {
    return this.apiService.get<Finalidad[]>('finalidades/circuito/?idCircuito=' + idCircuito);
  }

  getAll(): Observable<Finalidad[]> {
    return this.apiService.get<Finalidad[]>('finalidades');
  }
  getTipoFinalidad(idFinalidad: number): Observable<number> {
    return this.apiService.get<number>('finalidades/' + idFinalidad + '/tipofinalidad');
  }
}
