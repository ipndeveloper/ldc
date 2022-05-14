import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { EntityWithDescription } from '../../core/models/entity-with-description';

@Injectable({
  providedIn: 'root'
})
export class AutocompleteLocalidadService {

  constructor(private readonly apiService: ApiService) { }

  getLocalidades(codigo: string): Observable<EntityWithDescription[]> {
    return this.apiService.get(`localidad/codigo/${codigo}`);
  }
}
