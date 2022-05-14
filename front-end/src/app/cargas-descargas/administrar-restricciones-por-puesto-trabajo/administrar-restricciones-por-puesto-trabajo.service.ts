import { Injectable } from '@angular/core';
import { AdministrableFormService } from '../../core/components/search-form/services/administrable-form.service';
import { AdministrarRestriccionesPorPuestoTrabajoDataView } from '../../shared/data-models/administrar-restricciones-por-puesto-trabajo-data-view';
import { CrearRestriccionPorPuestoTrabajoCommand, RestriccionPorPuestoTrabajoCommand, ModificarRestriccionPorPuestoTrabajoCommand } from '../../shared/data-models/commands/cargas-descargas/restriccion-por-puesto-trabajo-command';
import { Observable } from 'rxjs';
import { Dictionary } from '../../core/models/dictionary';
import { ApiService } from '../../core/services/restClient/api.service';
import { PuestoTrabajo } from '../../shared/data-models/puesto-trabajo';

@Injectable({
  providedIn: 'root'
})
export class AdministrarRestriccionesPorPuestoTrabajoService extends
                                                              AdministrableFormService<AdministrarRestriccionesPorPuestoTrabajoDataView[],
                                                                                      RestriccionPorPuestoTrabajoCommand,
                                                                                      CrearRestriccionPorPuestoTrabajoCommand,
                                                                                      ModificarRestriccionPorPuestoTrabajoCommand,
                                                                                      AdministrarRestriccionesPorPuestoTrabajoDataView> {

  constructor(public readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'puesto-trabajo';
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarRestriccionesPorPuestoTrabajoDataView[]> {
      let query = `${this.apiRoute}/permisos?`;
      query += this.getQuerystringParameter(filters, 'permiso', 'idPermiso');
      query += this.getQuerystringParameter(filters, 'terminal', 'idTerminal');
      query += this.getQuerystringParameter(filters, 'puestoTrabajo', 'idPuestoTrabajo');
     return this.apiService.get<AdministrarRestriccionesPorPuestoTrabajoDataView[]>(query);
  }

  public validateSearchClick(): boolean {
    return true;
  }

  public getPermisoPorPuesto(puestoTrabajo: number, permiso: number) {
    const query = `${this.apiRoute}/permisos?&idPuestoTrabajo=${puestoTrabajo}&idPermiso=${permiso}`;
    return this.apiService.get<PuestoTrabajo[]>(query);
  }

  public getPuestosDeTrabajoPorTerminal(idTerminal: number): Observable<PuestoTrabajo[]> {
    const query = `${this.apiRoute}/puestos-por-terminal?&idTerminal=${idTerminal}`;
    return this.apiService.get<PuestoTrabajo[]>(query);
  }

  public create(command: CrearRestriccionPorPuestoTrabajoCommand): Observable<void> {
    const route = `${this.apiRoute}/permisos`;
    return this.apiService.post(route, command);
  }

  public update(command: ModificarRestriccionPorPuestoTrabajoCommand): Observable<void> {
    const route = `${this.apiRoute}/permisos`;
    return this.apiService.put(route, command);
  }

  public deleteComplexId(filters: Dictionary<string>): Observable<Object> {
    const route = `${this.apiRoute}/permisos`;
    return this.apiService.deleteComplexId(route, filters);
  }

}
