import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ModificarDatosOrdenCargaCamionCommand } from '../../../shared/data-models/commands/cargas-descargas/modificar-datos-orden-carga-camion-command';

@Injectable({
  providedIn: 'root'
})
export class ModificarDatosOrdenCargaCamionService {

  apiRoute: string;

  constructor(protected readonly apiService: ApiService) {
    this.apiRoute = 'control-carga-camion';
  }

  updateFueraDeCircuito(command: ModificarDatosOrdenCargaCamionCommand): Observable<number> {
    return this.apiService.put(`${this.apiRoute}/modificar-datos-orden-carga`, command);
  }
}
