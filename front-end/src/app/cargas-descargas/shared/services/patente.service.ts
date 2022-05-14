import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';

@Injectable()
export class PatenteService {

  constructor(private readonly apiService: ApiService) { }

  public getPatentes(patente: string): Observable<string[]> {

    const url = `patentes?patente=${patente}`;

    return this.apiService.get<string[]>(url);
  }

}
