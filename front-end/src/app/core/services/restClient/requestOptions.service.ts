import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../session/auth.service';

@Injectable()
export class RequestOptionsService {

    constructor(private readonly authService: AuthService) {

    }

    private addUserToken(headers: HttpHeaders): HttpHeaders {
        const userContext = this.authService.getUserContext();
        if (userContext) {
            headers = headers.append('Authorization', 'Bearer ' + userContext.token);
        }
        return headers;
    }
    public applyForBlob(): Object {
        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/zip');
        headers = headers.append('Content-Type', 'application/zip');

        headers = this.addUserToken(headers);

        const httpOptions = {
            headers: headers,
            responseType: 'blob'
        };

        return httpOptions;
    }

    public apply(): Object {

        let headers = new HttpHeaders();
        headers = headers.append('Accept', 'application/json');
        headers = headers.append('Content-Type', 'application/json');

        headers = this.addUserToken(headers);

        const httpOptions = {
            headers: headers
        };

        return httpOptions;
    }
}
