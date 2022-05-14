import { Injectable } from '@angular/core';
import { ApiService } from '../../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { AsignarTarjetaCommand, AsignarTarjetaPorDocumentoPorteYPatenteCommand } from '../../../../shared/data-models/commands/cargas-descargas/asignar-tarjeta-command';

@Injectable()
export class AsignarTarjetaService {

  constructor(private readonly apiService: ApiService) { }

  asignarTarjeta(idMovimiento: number, numeroTarjeta: number): Observable<void> {

    const url = `movimientos/${idMovimiento}/asignar-tarjeta`;
    const command = new AsignarTarjetaCommand(idMovimiento, numeroTarjeta);

    return this.apiService.post(url, command);
  }

  tarjetaEnUso(numeroTarjeta: number): Observable<boolean> {
    return this.apiService.get(`tarjetas/en-uso/${numeroTarjeta}`);
  }

  validarDocPorteYPatente(idTipoDocumentoPorte: number, documentoPorte: string, patente: string, ctg: number): Observable<boolean> {
    return this.apiService.get(`movimientos/validar?idTipoDocumentoPorte=${idTipoDocumentoPorte}` +
      `&numeroDocumentoPorte=${documentoPorte}&patente=${patente}&ctg=${ctg}`);
  }

  asignarTarjetaPorDocumentoPorteYPatente(command: AsignarTarjetaPorDocumentoPorteYPatenteCommand) {
    return this.apiService.post(`tarjetas/asignar`, command);
  }
}
