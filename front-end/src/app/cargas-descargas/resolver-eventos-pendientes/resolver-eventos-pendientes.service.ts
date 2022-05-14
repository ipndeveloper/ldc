import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { EventoActivoDataView } from '../../shared/evento-activo-data-view';

@Injectable({
  providedIn: 'root'
})
export class ResolverEventoService {
  private readonly apiRoute = `resolver-evento`;
  constructor(
    protected readonly apiService: ApiService) {
  }

  getEventosActivos(): Observable<object> {
    const url = `${this.apiRoute}/eventos-activos`;
    return this.apiService.get<EventoActivoDataView>(url);
  }
}
