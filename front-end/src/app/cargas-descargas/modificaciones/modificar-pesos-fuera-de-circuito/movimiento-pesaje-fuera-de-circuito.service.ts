import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { MovimientoPesaje } from '../../registrar-peso/movimiento-pesaje';
import { RegistrarPesajeFueraDeCircuitoCommand } from '../../../shared/data-models/commands/cargas-descargas/registrar-pesaje-fuera-de-circuito-command';
import { TiposTransporte } from '../../../shared/enums/enums';

@Injectable()
export class MovimientoPesajeFueraDeCircuitoService {

  constructor(private readonly apiService: ApiService) { }

  public getMovimientoPesaje(idMovimiento: number, idTipoTransporte: number): Observable<MovimientoPesaje> {
    let url: string;
    if (+idTipoTransporte === TiposTransporte.Camion) {
       url = 'movimiento-pesaje-camion/' + `${idMovimiento}` ;
    } else {
       url = 'movimiento-pesaje-vagon/' + `${idMovimiento}` ;
    }
    return this.apiService.get<MovimientoPesaje>(url);
  }
  public registrar(comando: RegistrarPesajeFueraDeCircuitoCommand): Observable<string>  {
    return this.apiService.post<string>('/movimiento-pesaje-camion/modificar-fuera-circuito', comando);
  }

}
