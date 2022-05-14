import { Injectable } from '@angular/core';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Usuario } from '../data-models/usuario';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends EntityWithCodeService<Usuario> {

  constructor(protected apiService: ApiService) {
    super(apiService);

    this.apiRoute = 'usuarios';
  }

  getByNombreUsuario(nombreUsuario: string): Observable<Usuario> {
    return this.apiService.get<Usuario>(`${this.apiRoute}/nombre-usuario?&nombreusuario=${nombreUsuario}&EsDeSistema=false`);
  }
}
