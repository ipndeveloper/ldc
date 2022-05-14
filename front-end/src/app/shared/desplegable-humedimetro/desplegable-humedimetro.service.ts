import { Injectable } from '@angular/core';
import { EntityService } from '../../core/shared/super/entity.service';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { Humedimetro } from '../data-models/Humedimetro';

@Injectable({
  providedIn: 'root'
})
export class HumedimetroService extends EntityService<Humedimetro> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<Humedimetro[]> {
    return this.apiService.get<Humedimetro[]>('tipos-dispositivo/humedimetros');
  }
}
