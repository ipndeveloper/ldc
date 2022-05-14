import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { JwtSecurityToken } from './jwt-security-token';
import { UserContext } from './user-context';

@Injectable()
export class AuthService {

  getUserContext(): UserContext | undefined {
    const token = localStorage.getItem(environment.tokenKey);

    if (token) {
      return new UserContext(token);
    }

    return undefined;
  }

  logout() {
    localStorage.removeItem(environment.tokenKey);
    localStorage.removeItem(environment.tokenExpirationKey);
    localStorage.removeItem(environment.permissionsKey);
    localStorage.removeItem(environment.currentUserKey);
    localStorage.removeItem(environment.terminalKey);
  }

  isTokenExpired(): boolean {
    const tokenExpirationTimeStamp = Number(localStorage.getItem(environment.tokenExpirationKey));
    if (tokenExpirationTimeStamp) {
      const tokenExpirationDateTime = new Date(tokenExpirationTimeStamp);
      return new Date() > tokenExpirationDateTime;
    }
    return true;
  }

  setSession(token: JwtSecurityToken) {
    const expirationDateTime = new Date();
    const expirationTimeStamp = expirationDateTime.setSeconds(expirationDateTime.getSeconds() + token.expires_in);
    localStorage.setItem(environment.tokenKey, token.access_token);
    localStorage.setItem(environment.tokenExpirationKey, expirationTimeStamp.toString());
  }
}
