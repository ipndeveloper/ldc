import { Injectable, ViewChild } from '@angular/core';
import { AdministrarCaracteristicasDataView } from '../../shared/data-models/administrar-caracteristicas-data-view';
import { SearchFormService } from '../../core/components/search-form/services/search-form.service';
import { Dictionary } from '../../core/models/dictionary';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { Actividad } from '../../shared/data-models/actividad';
import { DesplegableActividadComponent } from '../../shared/desplegable-actividad/desplegable-actividad.component';
import { CrearCaracteristicaCircuitoCommand, ModificarCaracteristicaCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/caracteristica-circuito-command';
import { Caracteristica } from '../../shared/data-models/caracteristica';
import { CaracteristicaPorCircuitoDataView } from '../../shared/data-models/caracteristica-por-circuito-data-view';

@Injectable({
  providedIn: 'root'
})
export class AdministrarCaracteristicasService extends SearchFormService<AdministrarCaracteristicasDataView[]> {

  @ViewChild('actividades') actividades: DesplegableActividadComponent;
  constructor(protected readonly apiService: ApiService) {
    super();
    this.apiRoute = 'circuitos';
  }

  public validateSearchClick(filters?: Dictionary<string>): boolean {
    if (filters) {
      return true;
    }
    return false;
  }

  public getData(filters: Dictionary<string>): Observable<AdministrarCaracteristicasDataView[]> {
     let query = `${this.apiRoute}/caracteristicas?`;

     query += this.getQuerystringParameter(filters, 'circuito', 'idCircuito');
     query += this.getQuerystringParameter(filters, 'actividad', 'idActividad');
     query += this.getQuerystringParameter(filters, 'caracteristica', 'idCaracteristica');
     query += this.getQuerystringParameter(filters, 'estaHabilitado', 'Habilitado');
    return this.apiService.get<AdministrarCaracteristicasDataView[]>(query);
  }

  public getCaracteristicaCircuito(id: number): Observable<CaracteristicaPorCircuitoDataView> {
    const query = `${this.apiRoute}/caracteristica?&Id=${id}`;
    return this.apiService.get<CaracteristicaPorCircuitoDataView>(query);
  }

  public getActividadesPorCircuito(circuito: number): Observable<Actividad[]> {
    const query = `${this.apiRoute}/actividades?&IdCircuito=${circuito}`;
    return this.apiService.get<Actividad[]>(query);
  }

  public getCaracteristicasPorActividad(IdActividad: number): Observable<Caracteristica[]> {
    const query = `actividades/caracteristicas?&IdActividad=${IdActividad}`;
    return this.apiService.get<Caracteristica[]>(query);
  }

  public crear(command: CrearCaracteristicaCircuitoCommand): Observable<void> {
    const query = `${this.apiRoute}/caracteristica`;
    return this.apiService.post(query, command);
  }

  public modificar(command: ModificarCaracteristicaCircuitoCommand): Observable<void> {
    const query = `${this.apiRoute}/caracteristica`;
    return this.apiService.put(query, command);
  }

  public eliminar(id: number): Observable<Object> {
    const route = `${this.apiRoute}/caracteristica`;
    return this.apiService.delete(route, id);
  }
}
