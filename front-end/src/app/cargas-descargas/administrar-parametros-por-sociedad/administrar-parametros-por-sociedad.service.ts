import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ParametrosSociedad } from '../../shared/data-models/parametros-sociedad';
import { ModificarParametrosPorSociedadCommand } from '../../shared/data-models/commands/cargas-descargas/modificar-parametros-por-sociedad-command';

@Injectable({
  providedIn: 'root'
})
export class AdministrarParametrosPorSociedadService {

  apiUrl = 'parametros-sociedad';

  constructor(private readonly apiService: ApiService) { }

  buscarParametros(idSociedad: number): Observable<ParametrosSociedad> {
    return this.apiService.get(`${this.apiUrl}/${idSociedad}`);
  }

  modificarParametros(command: ModificarParametrosPorSociedadCommand): Observable<void> {
    return this.apiService.put(`${this.apiUrl}/`, command);
  }
}
