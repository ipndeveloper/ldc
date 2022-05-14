import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';

@Injectable({
  providedIn: 'root'
})
export class VagonService {

  constructor(private readonly apiService: ApiService) { }

  public getVagones(vagon: string): Observable<string[]> {

    const url = `vagones?vagon=${vagon}`;

    return this.apiService.get<string[]>(url);
  }
}
