import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoControlSalida } from '../../shared/data-models/movimiento-control-salida';
import { ApiService } from '../../core/services/restClient/api.service';
import { RegistrarSalidaConDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-con-descarga-command';
import { RegistrarSalidaSinDescargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-sin-descarga-command';
import { RegistrarSalidaConCargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-con-carga-command';
import { RegistrarSalidaSinCargaCommand } from '../../shared/data-models/commands/cargas-descargas/registrar-salida-sin-carga-command';
import { ModalSeleccionarRemitoDataView } from '../../shared/data-models/modal-seleccionar-remito-data-view';

@Injectable()
export class ControlarSalidaService {

  constructor(private readonly apiService: ApiService) { }

  getRemitosByNroVagon(numeroVagon: number): Observable<ModalSeleccionarRemitoDataView[]> {
    return this.apiService.get(`control-salida/remitos?numeroVagon=${numeroVagon}`);
  }

  public getMovimientoControlSalida(patenteCamion: string,
                                    numeroTarjeta?: number,
                                    numeroVagon?: number,
                                    idVendedor?: number,
                                    numeroDocPorte?: number): Observable<MovimientoControlSalida> {

    let url = `control-salida?patente=${patenteCamion}`;

    if (numeroTarjeta) {
      url += `&tarjeta=${numeroTarjeta}`;
    }
    if (numeroVagon) {
      url += `&numeroVagon=${numeroVagon}`;
    }
    if (idVendedor) {
      url += `&idVendedor=${idVendedor}`;
    }
    if (numeroDocPorte) {
      url += `&numeroDocPorte=${numeroDocPorte}`;
    }

    return this.apiService.get<MovimientoControlSalida>(url);
  }

  public getMovimientoControlSalidaPorIdMovimiento(idMovimiento: number): Observable<MovimientoControlSalida> {
    const url = `control-salida/movimiento/${idMovimiento}`;
    return this.apiService.get<MovimientoControlSalida>(url);
  }

  public registrarSalidaConDescarga(command: RegistrarSalidaConDescargaCommand): Observable<string> {

    const apiURL = `control-salida/${command.idMovimiento}/registrar-salida-con-descarga`;

    return this.apiService.post<string>(apiURL, command);
  }

  public registrarSalidaSinDescarga(command: RegistrarSalidaSinDescargaCommand): Observable<string> {

    const apiURL = `control-salida/${command.id}/registrar-salida-sin-descarga`;

    return this.apiService.post<string>(apiURL, command);
  }

  public registrarSalidaConCarga(command: RegistrarSalidaConCargaCommand): Observable<any> {

    const apiURL = `control-salida/${command.id}/registrar-salida-con-carga`;

    return this.apiService.post<string>(apiURL, command);
  }

  public registrarSalidaSinCarga(command: RegistrarSalidaSinCargaCommand): Observable<string> {

    const apiURL = `control-salida/${command.id}/registrar-salida-sin-carga`;

    return this.apiService.post<string>(apiURL, command);
  }
}
