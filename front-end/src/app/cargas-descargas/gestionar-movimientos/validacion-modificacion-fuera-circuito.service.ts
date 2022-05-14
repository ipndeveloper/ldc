import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { ControlModificacionMovimiento } from '../../shared/data-models/gestionar-movimientos/control-modificacion-movimiento';

@Injectable()
export class ValidacionDeModificacionFueraDeCircuitoService {

  private readonly apiUrl = 'modificacion-de-movimiento';

  constructor(private readonly apiService: ApiService) { }

  public puedeModificarDatosGeneralesFueraDeCircuito(idMovimiento: number): Observable<ControlModificacionMovimiento> {
      return this.apiService.get<ControlModificacionMovimiento>(`${this.apiUrl}/${idMovimiento}/datos-generales`);
  }

  public puedeModificarDatosDeCalidadFueraDeCircuito(idMovimiento: number): Observable<ControlModificacionMovimiento> {
    return this.apiService.get<ControlModificacionMovimiento>(`${this.apiUrl}/${idMovimiento}/datos-calidad`);
  }

  public puedeModificarDatosDePesajeFueraDeCircuito(idMovimiento: number): Observable<ControlModificacionMovimiento> {
    return this.apiService.get<ControlModificacionMovimiento>(`${this.apiUrl}/${idMovimiento}/datos-pesaje`);
  }

  public puedeModificarProductoFueraDeCircuito(idMovimiento: number): Observable<ControlModificacionMovimiento> {
    return this.apiService.get<ControlModificacionMovimiento>(`${this.apiUrl}/${idMovimiento}/datos-producto`);
  }
}
