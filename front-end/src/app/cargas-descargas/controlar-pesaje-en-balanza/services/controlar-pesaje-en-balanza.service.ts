import { Injectable } from '@angular/core';
import { SearchByDateRangeService } from '../../../core/services/search-by-date-range.service';
import { MovimientoControlPesoItemDataView } from '../../../shared/data-models/movimiento-control-peso-item-data-view';
import { ApiService } from '../../../core/services/restClient/api.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Dictionary } from '../../../core/models/dictionary';
import { Observable } from 'rxjs';
import { MovimientoControlPesoDataView } from '../../../shared/data-models/movimiento-control-peso-data-view';

@Injectable()
export class ControlarPesajeEnBalanzaService
  extends SearchByDateRangeService<MovimientoControlPesoItemDataView[]> {

  constructor(apiService: ApiService, popupService: PopupService) {
    super(apiService, popupService);
    this.apiRoute = 'movimiento-pesaje-camion/control-peso';
  }

  public getData(filters: Dictionary<string>): Observable<MovimientoControlPesoItemDataView[]> {

    const query = `${this.apiRoute}?fechaDesde=${filters['fechaDesde']}&fechaHasta=${filters['fechaHasta']}`;

    return this.apiService.get<Array<MovimientoControlPesoItemDataView>>(query);
  }

  public getControlPeso(idMovimiento: number): Observable<MovimientoControlPesoDataView> {

    const query = `${this.apiRoute}/${idMovimiento}`;
    return this.apiService.get<MovimientoControlPesoDataView>(query);
  }

  public validateSearchClick(filters?: Dictionary<string> | undefined): boolean {
    if (filters) {
      return this.fechaDesdeHastaValidas(filters['fechaDesde'], filters['fechaHasta'], filters['parametroDiasFiltro']);
    }
    return false;
  }
}
