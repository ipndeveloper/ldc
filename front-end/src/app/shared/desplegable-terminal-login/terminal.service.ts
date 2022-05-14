import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Terminal } from '../data-models/terminal';

@Injectable({
  providedIn: 'root'
})
export class TerminalService extends EntityService<Terminal> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Terminal[]> {
    return this.apiService.get<Terminal[]>('terminales');
  }

  getAllByFiltro(incluirAdministracionCentral: boolean, permiso?: string, utilizaTarjeta?: boolean): Observable<Terminal[]> {
    let url = `terminales/filtrarterminales?incluirAdministracionCentral=${incluirAdministracionCentral}`;

    if (permiso) {
      url += `&codigoPermiso=${permiso}`;
    }
    if (utilizaTarjeta != null) {
      url += `&utilizaTarjeta=${utilizaTarjeta}`;
    }
    return this.apiService.get<Terminal[]>(url);
  }

  getAllByPropietario(propietarioId: number) {
    const query = `PropietarioId=${propietarioId}`;
    return this.apiService.get<Terminal[]>(`terminales/propietario?${query}`);
  }
}
