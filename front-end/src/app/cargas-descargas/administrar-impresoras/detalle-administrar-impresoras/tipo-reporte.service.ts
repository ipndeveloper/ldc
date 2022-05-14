import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class TipoReporteService {

  constructor(private readonly apiService: ApiService) { }

  getAll(): Observable<EntityWithDescription[]> {
    return this.apiService.get('tipos-reporte');
  }
}
