import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { QuitarDeCircuitoCommand } from '../../shared/data-models/commands/cargas-descargas/quitar-de-circuito-command';
import { MovimientoQuitarDeCircuitoDataView } from '../../shared/data-models/movimiento-quitar-de-circuito-data-view';
import { TiposTransporte } from '../../shared/enums/enums';

@Injectable()
export class QuitarDeCircuitoService {
  private readonly apiUrl = 'movimientos-quitar-de-circuito';

  constructor(private readonly apiService: ApiService) {
  }

  getMovimientoQuitarDeCircuito(idTipoTransporte: number, filtro: string): Observable<MovimientoQuitarDeCircuitoDataView> {
    let url = `${this.apiUrl}?IdTipoTransporte=${idTipoTransporte}`;

    url = (idTipoTransporte === TiposTransporte.Camion) ? `${url}&patente=${filtro}`
                                                        : `${url}&vagon=${filtro}`;

    return this.apiService.get<MovimientoQuitarDeCircuitoDataView>(url);
  }

  quitarDeCircuito(command: QuitarDeCircuitoCommand): Observable<string> {
    const apiURL = `${this.apiUrl}/${command.id}/quitar-de-circuito`;

    return this.apiService.post<string>(apiURL, command);
  }
}
