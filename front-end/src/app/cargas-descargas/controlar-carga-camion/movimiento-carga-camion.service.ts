import { Injectable } from '@angular/core';
import { MovimientoCargaService } from '../shared/controlar-carga-base/services/movimiento-carga.service';
import { CargaCamionCommand, ControlarCargaCamionCommand, ModificarCargaCamionCommand } from '../../shared/data-models/commands/cargas-descargas/controlar-carga-command';
import { ApiService } from '../../core/services/restClient/api.service';
import { MovimientoCargaCamion } from '../../shared/data-models/movimiento-carga';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovimientoCargaCamionService
  extends MovimientoCargaService<MovimientoCargaCamion,
                                 CargaCamionCommand,
                                 ControlarCargaCamionCommand,
                                 ModificarCargaCamionCommand> {

  constructor(protected readonly apiService: ApiService) {
    super(apiService);
    this.apiRoute = 'control-carga-camion';
  }

  getViajeCarga(id: number): Observable<MovimientoCargaCamion> {
    const route = 'viajes/subproducto-cereal-nograno';
    return this.api.get<MovimientoCargaCamion>(`${route}/${id}`);
  }
}
