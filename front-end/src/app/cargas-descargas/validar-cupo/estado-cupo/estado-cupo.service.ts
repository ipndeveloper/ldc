import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Cupo } from '../../../shared/data-models/cupo';

@Injectable({
  providedIn: 'root'
})
export class EstadoCupoService {
  apiRoute: string;
  constructor(private readonly api: ApiService) {
    this.apiRoute = 'estado-cupo/';
   }

  get(cupo: Cupo): Observable<void> {
    const url = `${this.apiRoute}${cupo.id}`;
    return this.api.get<void>(url);
  }
}
