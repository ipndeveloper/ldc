import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';
import { FormatoPatente } from '../../../shared/data-models/formato-patente';

@Injectable({
  providedIn: 'root'
})
export class FormatoPatenteService {

  constructor(private readonly apiService: ApiService) {
  }

  public getAll(): Observable<FormatoPatente[]> {

    const url = `formato-patentes`;

    return this.apiService.get<FormatoPatente[]>(url);
  }
}
