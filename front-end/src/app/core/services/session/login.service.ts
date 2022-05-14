import { Injectable } from '@angular/core';
import { ApiService } from '../restClient/api.service';
import { JwtSecurityToken } from './jwt-security-token';
import { Observable } from 'rxjs';
import { Terminal } from '../../../shared/data-models/terminal';

@Injectable({providedIn: 'root'})
export class LoginService {

  constructor(
    private readonly apiService: ApiService) { }

  login(usuario: string, contrasenia: string, idTerminal: number): Observable<JwtSecurityToken> {

    const url = 'login';
    const command = { nombreUsuario: usuario, contrasenia: contrasenia, idTerminal };

    return this.apiService.post<JwtSecurityToken>(url, command);
  }

  obtenerTerminalesUsuario(nombreUsuario: string, contrasenia: string): Observable<Terminal[]> {
    const url = 'login/terminales-por-usuario';
    const command = { nombreUsuario: nombreUsuario, contrasenia: contrasenia };

    return this.apiService.post<Terminal[]>(url, command);
  }
}
