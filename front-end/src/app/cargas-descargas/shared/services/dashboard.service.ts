import { BalanzaDashboard as BalanzaDashboard } from '../../../shared/data-models/balanza-dashboard';
import { BalanzaAutomatizadaLog } from '../../../shared/data-models/balanza-automatizada-log';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { SeleccionarBalanzasDashboardCommand } from '../data-models/seleccionar-balanzas-dashboard-command';

@Injectable({
    providedIn: 'root'
  })

export class DashboardService {

    private readonly apiUrl = 'dashboard';

    constructor(private readonly apiService: ApiService) { }

    public obtenerBalanzasAutomatizadasDashboard(idUsuario: number): Observable<BalanzaDashboard[]> {
        const url = `${this.apiUrl}/balanzas-automatizadas?`;
        return this.apiService.get(url + 'idUsuario=' + idUsuario);
      }

      public obtenerLogBalanzaAutomatizada(idBalanza: number): Observable<BalanzaAutomatizadaLog[]> {
        const url = `${this.apiUrl}/balanza/${idBalanza}/log`;
        return this.apiService.get(url);
      }

      public obtenerBalanzasSeleccionadas(idUsuario: number): Observable<BalanzaDashboard[]> {
        const url = `${this.apiUrl}/balanzas-seleccionadas?`;
        return this.apiService.get(url + 'idUsuario=' + idUsuario);
      }

      public obtenerBalanzaDashboard(idBalanza: number): Observable<BalanzaDashboard> {
        const url = `${this.apiUrl}/balanza/`;
        return this.apiService.get(url + idBalanza);
      }

      public guardarBalanzasSeleccionadas(idUsuario: number, balanzas: number[]): Observable<number> {
        const url = `${this.apiUrl}/seleccionar-balanzas`;
        return this.apiService.post(url, new SeleccionarBalanzasDashboardCommand(idUsuario, balanzas));
      }
}
