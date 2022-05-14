import { Injectable } from '@angular/core';
import { DejarPendienteDescargaCamionSubproductosCommand } from '../../shared/data-models/commands/cargas-descargas/dejar-pendiente-descarga-camion-subproductos-command';
import { ControlarDescargaCamionSubproductosCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-subproductos-command';
import { Observable } from 'rxjs';
import { ApiService } from '../../core/services/restClient/api.service';
import { ModificarDescargaCamionSubproductosFueraPuestoCommand } from '../modificaciones/modificar-control-descarga-camion-subproductos-nogranos/modificar-descarga-camion-subproductoss-fuera-puesto-command';
import { ModificarDescargaCamionSubproductosFueraCircuitoCommand } from '../modificaciones/modificar-control-descarga-camion-subproductos-nogranos/modificar-descarga-camion-subproductos-fuera-circuito-command';

@Injectable()
export class ControlarDescargaCamionSubproductosService {
  private readonly apiURL = 'control-descarga-camion-subproductos';

  constructor(private readonly apiService: ApiService) {
  }

  public RegistrarMovimiento(movimiento: ControlarDescargaCamionSubproductosCommand): Observable<number> {
    return this.apiService.post<number>(this.apiURL, movimiento);
  }

  public DejarPendiente(movimiento: DejarPendienteDescargaCamionSubproductosCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/dejar-pendiente', movimiento);
  }

  public modificarFueraPuesto(command: ModificarDescargaCamionSubproductosFueraPuestoCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-puesto', command);
  }

  public modificarFueraCircuito(command: ModificarDescargaCamionSubproductosFueraCircuitoCommand): Observable<string> {
    return this.apiService.post<string>(this.apiURL + '/modificar-fuera-circuito', command);
  }
}
