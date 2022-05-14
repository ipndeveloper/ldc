import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../../core/services/restClient/api.service';

const apiUrl = '/autorizacion/';

@Injectable()
export class AutorizarcionService {
  constructor(private readonly apiService: ApiService) { }

  autorizar(usuario: string, contrasenia: string, codigoTarjeta: string, idsRoles: number[]):
    Observable<{idUsuario: number, idRol: number}>  {
    return this.apiService.post<{idUsuario: number, idRol: number}>
      (apiUrl, {nombreUsuario: usuario, codigoTarjeta, password: contrasenia, idsRoles});
  }
}
