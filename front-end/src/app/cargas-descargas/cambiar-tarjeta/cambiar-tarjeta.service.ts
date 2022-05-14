import { Injectable } from '@angular/core';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { MovimientoCambioTarjeta } from '../../shared/data-models/movimiento-cambio-tarjeta';
import { CambiarTarjetaCommand } from '../../shared/data-models/commands/cargas-descargas/cambiar-tarjeta-command';
import { ModalSeleccionarRemitoDataView } from '../../shared/data-models/modal-seleccionar-remito-data-view';

@Injectable()
export class CambiarTarjetaService {

  constructor(private readonly apiService: ApiService) { }

  buscarMovimientos(numeroDocumentoPorte: string, idTipoDocumentoPorte?: number, numeroVagon?: number, patenteCamion?: string, ctg?: number)
    : Observable<ModalSeleccionarRemitoDataView[]> {
    const url = `movimientos/cambiar-tarjeta-buscar?idTipoDocumentoPorte=${idTipoDocumentoPorte}&numeroDocumentoPorte=${numeroDocumentoPorte}`
    + `&numeroVagon=${numeroVagon}` + `&patenteCamion=${patenteCamion}` + `&ctg=${ctg}`;

    return this.apiService.get<ModalSeleccionarRemitoDataView[]>(url);
  }

  buscarMovimientoPorId(idMovimiento: number)
    : Observable<MovimientoCambioTarjeta> {
    const url = `movimientos/cambiar-tarjeta?idMovimiento=${idMovimiento}`;

    return this.apiService.get<MovimientoCambioTarjeta>(url);
  }

  cambiarTarjeta(idMovimiento: number, numeroTarjetaNueva: number): Observable<void> {
    const url = `movimientos/${idMovimiento}/cambiar-tarjeta`;
    const command = new CambiarTarjetaCommand(idMovimiento, numeroTarjetaNueva);

    return this.apiService.patch(url, command);
  }
}
