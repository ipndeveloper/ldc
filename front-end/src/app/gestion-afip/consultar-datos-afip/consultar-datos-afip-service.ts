import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { DatosAfipDataView } from './datos-afip-data-view';
import { DatosCpeAfipDataView } from './datos-Cpe-Afip-Data-View';
import { DatosFerroviariosAfipDataView } from './datos-Cpe-Ferroviaria-Afip-Data-View';

@Injectable()
export class ConsultarDatosAfipService {

  private readonly apiUrl = 'consultar-datos-afip';

  constructor(private readonly apiService: ApiService) { }

  public getData(codigoCtg: number): Observable<DatosAfipDataView> {
    return this.apiService.get<DatosAfipDataView>(`${this.apiUrl}/${codigoCtg}`);
  }

  public getDataCpe(codigoCtg: number, tipoCartaPorte: number, idMovimiento?: number)
  : Observable<DatosCpeAfipDataView> {
    let query = `${this.apiUrl}/cpe?ctg=${codigoCtg}&idTipoDocumentoPorte=${tipoCartaPorte}`;

    if (idMovimiento != null) {
      query = `${query}&idMovimiento=${idMovimiento}`;
    }

    return this.apiService.get<DatosCpeAfipDataView>(query);
  }
  public getDataCpeFerroviaria(codigoCtg: number, tipoCartaPorte: number, idMovimiento?: number)
  : Observable<DatosFerroviariosAfipDataView> {
    let query = `${this.apiUrl}/trenes/cpe?ctg=${codigoCtg}&idTipoDocumentoPorte=${tipoCartaPorte}`;

    if (idMovimiento != null) {
      query = `${query}&idMovimiento=${idMovimiento}`;
    }

    return this.apiService.get<DatosFerroviariosAfipDataView>(query);
  }
}
