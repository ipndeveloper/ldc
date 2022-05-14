import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { Usuario } from '../data-models/usuario';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends EntityService<Usuario> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Usuario[]> {
    return this.apiService.get<Usuario[]>('usuarios');
  }
}
