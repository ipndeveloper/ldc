import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Silo } from '../data-models/silo';

@Injectable()
export class SiloService extends EntityService<Silo> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getSilosPorProducto(idProducto: number): Observable<Silo[]> {
    return this.apiService.get<Silo[]>('silos/producto/' + idProducto);
  }

  getSilosPorTerminal(idTerminal: number): Observable<Silo[]> {
    const route = `silos/terminal/?&IdTerminal=${idTerminal}`;
    return this.apiService.get<Silo[]>(route);
  }

}
