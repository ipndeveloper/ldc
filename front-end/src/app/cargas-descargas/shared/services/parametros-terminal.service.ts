import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ParametrosTerminalDataView } from '../../../shared/data-models/parametros-terminal-data-view';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

@Injectable()
export class ParametrosTerminalService {

  private readonly ApiUrl = 'parametros-terminal';

  constructor(private readonly apiService: ApiService) {
  }

  getParametros(): Observable<ParametrosTerminalDataView> {
    return this.apiService.get(this.ApiUrl);
  }

  getFormatosPatente(): Observable<string[]> {
    return this.apiService.get(`formato-patentes/terminales`);
  }

  getCosechaPorDefecto(idProducto: number, idTerminal: number): Observable<EntityWithDescription> {
    return this.apiService.get(`${this.ApiUrl}/productos/${idProducto}/terminales/${idTerminal}/cosecha`);
  }

  getGestionaCot(idProducto: number): Observable<Boolean> {
    return this.apiService.get(`${this.ApiUrl}/productos/${idProducto}/terminales/null/gestionacot`);
  }
}

