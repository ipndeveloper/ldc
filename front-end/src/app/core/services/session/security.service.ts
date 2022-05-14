import { Injectable } from '@angular/core';
import { ApiService } from '../restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class SecurityService {

  constructor(private readonly apiService: ApiService) { }

  getPermissions(): Observable<string[]> {
    return this.apiService.post<string[]>('permisos', {});
  }
}
