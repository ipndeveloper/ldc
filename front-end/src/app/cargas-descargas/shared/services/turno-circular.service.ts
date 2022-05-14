import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/restClient/api.service';
import { BuscarTurnoCircularCommand } from '../../../shared/data-models/buscar-turno-circular.command';
import { TurnoCircularDataView } from '../../../shared/data-models/turno-circular-data-view';

@Injectable()
export class TurnoCircularService {

  constructor(private readonly apiService: ApiService) { }

  public BuscarTurnoCircular(command: BuscarTurnoCircularCommand): Observable<TurnoCircularDataView | null> {

    let url = `turnocircular?ctg=${command.CTG}&ProductoId=${command.productoId}&idTipoDocumentoPorte=${command.idTipoDocumentoPorte}`;

    if (command.patente) {
      url += `&patente=${command.patente}`;
    }

    return this.apiService.get<TurnoCircularDataView | null>(url);
  }

}
