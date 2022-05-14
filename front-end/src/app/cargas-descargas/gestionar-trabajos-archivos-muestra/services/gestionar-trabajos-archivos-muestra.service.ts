import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ReintentarTrabajoGeneracionArchivoMuestrasCommand } from '../../../shared/data-models/commands/cargas-descargas/reintentar-trabajo-generacion-archivo-muestras-command';
import { DescartarTrabajoGeneracionArchivoMuestrasCommand } from '../../../shared/data-models/commands/cargas-descargas/descartar-trabajo-generacion-archivo-muestras-command';
import { AgregarTrabajoGeneracionArchivoMuestrasCommand } from '../../../shared/data-models/commands/cargas-descargas/agregar-trabajo-generacion-archivo-muestras-command';


@Injectable()
export class GestionarTrabajosArchivosMuestraService {

  constructor(private readonly apiService: ApiService) {

  }

  public reintentar(command: ReintentarTrabajoGeneracionArchivoMuestrasCommand): Observable<string> {
    return this.apiService.post<string>('gestionar-trabajos-generacion-archivos-muestras/reintentar', command);
  }

  public descartar(command: DescartarTrabajoGeneracionArchivoMuestrasCommand): Observable<string> {
    return this.apiService.post<string>('gestionar-trabajos-generacion-archivos-muestras/descartar', command);
  }

  public agregar(command: AgregarTrabajoGeneracionArchivoMuestrasCommand): Observable<string> {
    return this.apiService.post<string>('gestionar-trabajos-generacion-archivos-muestras/agregar', command);
  }
}
