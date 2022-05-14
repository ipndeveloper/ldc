import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovimientoCalado } from '../../shared/data-models/movimiento-calado';
import { ApiService } from '../../core/services/restClient/api.service';
import { IngresarCalidadCommand } from '../../shared/data-models/commands/cargas-descargas/ingresar-calidad-command';
import { CalculoCalidad } from '../../shared/data-models/calculo-calidad/calculo-calidad';
import { ResultadoCalculoCalidad } from '../../shared/data-models/calculo-calidad/resultado-calculo-calidad';
import { AccionPosCalado } from '../../shared/data-models/calculo-calidad/accion-pos-calado';
import { AccionPosCaladoRespuesta } from '../../shared/data-models/calculo-calidad/accion-pos-calado-respuesta';

const apiUrl = 'movimientos-calidad';

@Injectable()
export class IngresarCalidadCaladoService {

  constructor(private readonly apiService: ApiService) { }

  public getMovimientoCalado(patenteCamion: string, numeroVagon: number, numeroTarjeta: number): Observable<MovimientoCalado> {

    const url = `${apiUrl}?patente=${patenteCamion}&numeroVagon=${numeroVagon}&numeroTarjeta=${numeroTarjeta}`;

    return this.apiService.get<MovimientoCalado>(url);
  }

  public getMovimientoCaladoById(idMovimiento: number): Observable<MovimientoCalado> {

    const url = `${apiUrl}/${idMovimiento}`;

    return this.apiService.get<MovimientoCalado>(url);
  }

  public CalcularCalidad(calculoCalidad: CalculoCalidad): Observable<ResultadoCalculoCalidad> {
    return this.apiService.post<ResultadoCalculoCalidad>('/calculador-calidad/calcular', calculoCalidad);
  }

  public DeterminarAccionPosCalado(accionPosCalado: AccionPosCalado): Observable<AccionPosCaladoRespuesta> {
    return this.apiService.post<AccionPosCaladoRespuesta>('/calculador-calidad/determinar-accion-pos-calado', accionPosCalado);
  }

  public RegistrarCalidad(command: IngresarCalidadCommand, accionPath: string): Observable<string> {
    return this.apiService.post<string>(`${apiUrl}/${command.id}/${accionPath}`, command);
  }
}
