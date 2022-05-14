import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class ParametrosService {

  version = '{{VERSION_GOES_HERE}}';

  private apiUrl = 'parametros';

  constructor(private readonly apiService: ApiService) { }

  obtenerAmbiente(): Observable<string> {
    return this.apiService.get(`${this.apiUrl}/ambiente`);
  }

  obtenerUbicacionFisica(): Observable<string> {
    return this.apiService.get(`${this.apiUrl}/ubicacionFisica`);
  }
}
