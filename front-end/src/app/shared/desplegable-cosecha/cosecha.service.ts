import { Injectable } from '@angular/core';
import { Cosecha } from '../data-models/cosecha';
import { EntityWithCodeService } from '../../core/shared/super/entity-with-codeservice';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { map } from 'rxjs/operators';

@Injectable()
export class CosechaService extends EntityWithCodeService<Cosecha> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
  }

  getCosechasPorProducto(idProducto: number): Observable<Cosecha[]> {
    return this.apiService.get<Cosecha[]>('cosecha?idProducto=' + idProducto)
                          .pipe(map((datos: Cosecha[]) => {
                            datos.unshift({descripcion: 'Seleccione', id: undefined} as any);
                            return datos;
                          }));
  }
}
