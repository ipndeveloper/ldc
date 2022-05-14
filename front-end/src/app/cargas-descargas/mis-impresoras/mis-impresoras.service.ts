import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { MisImpresorasDataView } from '../../shared/data-models/mis-impresoras-data-view';
import { AuthService } from '../../core/services/session/auth.service';
import { ImpresoraDataView } from '../../shared/data-models/impresora-data-view';

@Injectable({
  providedIn: 'root'
})
export class MisImpresorasService {

  constructor(private readonly api: ApiService,
              private readonly authService: AuthService) { }

  get idUsuarioActual() {
    const userContext = this.authService.getUserContext();
    if (userContext) {
      return userContext.idUsuario;
    }
    return undefined;
  }

  buscar(idUsuario?: number): Observable<MisImpresorasDataView[]> {
    return this.api.get(`impresoras/usuario/${idUsuario || this.idUsuarioActual}`);
  }

  marcarPorDefecto(idImpresoraUsuario: number): Observable<void> {
    return this.api.post(`impresoras/por-defecto/`, {id: idImpresoraUsuario});
  }

  ObtenerPorDefecto(): Observable<ImpresoraDataView> {
    return this.api.get(`impresoras/por-defecto/`);
  }
}
