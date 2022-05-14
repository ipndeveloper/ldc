import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { PlataformaDescarga } from '../data-models/plataforma-descarga';

@Injectable()
export class PlataformaDescargaService extends EntityService<PlataformaDescarga> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<PlataformaDescarga[]> {
    return this.apiService.get<PlataformaDescarga[]>('plataforma-descarga');
  }
}
