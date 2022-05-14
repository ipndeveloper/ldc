import { Injectable } from '@angular/core';
import { LugarDescarga } from '../../../shared/data-models/lugar-descarga';
import { Observable } from 'rxjs';
import { EntityService } from '../../../core/shared/super/entity.service';
import { ApiService } from '../../../core/services/restClient/api.service';

@Injectable()
export class LugarDescargaService extends EntityService<LugarDescarga> {

  constructor(private readonly apiService: ApiService) {
    super();
  }

  getAll(): Observable<LugarDescarga[]> {
    return this.apiService.get<LugarDescarga[]>('condicion-manipuleo');
  }

  getLugarDescargaPorParametros(idProducto: number, humedad: number, proteina: number, grado: number): Observable<LugarDescarga[]> {
    const lugares = this.apiService.get<LugarDescarga[]>(
      'condicion-manipuleo?idProducto=' + idProducto + '&humedad=' + humedad + '&proteina=' + proteina + '&grado=' + grado);

    return lugares;
  }
}
