import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EntityService } from '../../../core/shared/super/entity.service';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CondicionManipuleo } from '../../../shared/data-models/condicion-manipuleo';

@Injectable()
export class CondicionManipuleoService extends EntityService<CondicionManipuleo> {

  apiURL = 'condicion-manipuleos';

  constructor(private readonly apiService: ApiService) {
    super();
  }

  public getAll(): Observable<CondicionManipuleo[]> {
    return this.apiService.get<CondicionManipuleo[]>(this.apiURL);
  }

  public getCondicionManipuleoPorParametros( idProducto: number,
                                              humedad: number | undefined,
                                              proteina: number | undefined,
                                              grado: number | undefined,
                                              tipoTransporte: number,
                                              tipoMovimiento: number): Observable<CondicionManipuleo[]> {

    const lugares = this.apiService.get<CondicionManipuleo[]>(
      `${this.apiURL}?idProducto=${idProducto}` +
      `&humedad=${humedad}` +
      `&proteina=${proteina}` +
      `&grado=${grado}` +
      `&IdTipoTransporte=${tipoTransporte}` +
      `&IdTipoMovimiento=${tipoMovimiento}`);

    return lugares;
  }

  public getCondicionManipuleoCargaPorParametros(idProducto: number,
                                                 tipoTransporte: number,
                                                 tipoMovimiento: number): Observable<CondicionManipuleo[]> {
    return this.apiService.get<CondicionManipuleo[]>(
      `${this.apiURL}?idProducto=${idProducto}` +
      `&IdTipoTransporte=${tipoTransporte}` +
      `&IdTipoMovimiento=${tipoMovimiento}`
    );
  }
}
