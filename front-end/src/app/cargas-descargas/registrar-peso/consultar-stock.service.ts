import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConsultarStockDataView } from '../../shared/data-models/consulta-stock-data-view';
import { ApiService } from '../../core/services/restClient/api.service';
import { ConsultarCantidadEstimadaDataView } from '../../shared/data-models/consultar-cantidad-estimada-data-view';

@Injectable({
  providedIn: 'root'
})
export class ConsultarStockService {

  constructor(private readonly apiService: ApiService) {
  }

  getStockDisponible(idMovimiento: number,
                     esConsulta: boolean,
                     idManipuleo?: number,
                     idViaje?: number,
                     pesoNeto?: number): Observable<ConsultarStockDataView> {
    let apiUrl = `stock?idMovimiento=${idMovimiento}&esConsulta=${esConsulta}`;
    if (idViaje) {
      apiUrl = `${apiUrl}&idViaje=${idViaje}`;
    }
    if (idManipuleo) {
      apiUrl = `${apiUrl}&idManipuleo=${idManipuleo}`;
    }

    if (pesoNeto) {
      apiUrl = `${apiUrl}&pesoNeto=${pesoNeto}`;
    }
    return this.apiService.getWithCustomHandlingError<ConsultarStockDataView>(apiUrl);
  }

  getStockDisponibleConPesoNeto(idMovimiento: number,
                                esConsulta: boolean,
                                pesoNeto: number): Observable<ConsultarStockDataView> {
    const apiUrl = `stock?idMovimiento=${idMovimiento}&esConsulta=${esConsulta}&pesoNeto=${pesoNeto}`;
    return this.apiService.get<ConsultarStockDataView>(apiUrl);
  }

  getCantidadEstimada(idMovimiento: number): Observable<ConsultarCantidadEstimadaDataView> {
    const apiUrl = `stock/cantidad-estimada?idMovimiento=${idMovimiento}`;
    return this.apiService.get<ConsultarCantidadEstimadaDataView>(apiUrl);
  }
}
