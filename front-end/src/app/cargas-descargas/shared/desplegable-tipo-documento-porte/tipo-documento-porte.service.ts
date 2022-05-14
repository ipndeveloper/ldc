import { Injectable } from '@angular/core';

import { TipoDocumentoPorte } from '../data-models/tipo-documento-porte';
import { EntityService } from '../../../core/shared/super/entity.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';

@Injectable()
export class TipoDocumentoPorteService extends EntityService<TipoDocumentoPorte> {
  readonly apiRoute = 'tipos-documentos-porte';
  constructor(private readonly apiService: ApiService) {
    super();
  }

  getByCriteria(tipoProducto?: TipoProducto, tipoTransporte?: TipoTransporte): Observable<TipoDocumentoPorte[]> {
    let apiRoute = `${this.apiRoute}/terminal/?`;
    if (tipoProducto) {
      apiRoute = apiRoute + `idTipoProducto=${tipoProducto.id}&`;
    }
    if (tipoTransporte) {
      apiRoute = apiRoute + `idTipoTransporte=${tipoTransporte.id}`;
    }
    return this.apiService.get<TipoDocumentoPorte[]>(apiRoute);
  }

  getAll(): Observable<TipoDocumentoPorte[]> {
    return this.apiService.get<TipoDocumentoPorte[]>(this.apiRoute);
  }

  consultarComportamientoAfip(idTipoDocumentoPorte: number): Observable<number> {
    const apiRoute = `${this.apiRoute}/comportamiento-afip/${idTipoDocumentoPorte}`;
    return this.apiService.get<number>(apiRoute);
  }
}
