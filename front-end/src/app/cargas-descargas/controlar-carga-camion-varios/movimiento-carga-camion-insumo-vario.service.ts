import { Injectable } from '@angular/core';
import { MovimientoCargaService } from '../shared/controlar-carga-base/services/movimiento-carga.service';
import { MovimientoCargaCamionVarios } from '../../shared/data-models/movimiento-carga';
import {
  ControlarCargaCamionVariosCommand,
  CrearCargaCamionVariosCommand,
  ModificarCargaCamionVariosCommand
} from '../../shared/data-models/commands/cargas-descargas/controlar-carga-camion-varios-command';
import { ApiService } from '../../core/services/restClient/api.service';
import { Observable } from 'rxjs';
import { ModificarDatosOrdenCargaCamionInsumoVariosCommand } from '../../shared/data-models/commands/cargas-descargas/modificar-datos-orden-carga-camion-insumo-varios-command';

@Injectable({
  providedIn: 'root'
})
export class MovimientoCargaCamionInsumoVarioService
            extends MovimientoCargaService<
                    MovimientoCargaCamionVarios,
                    ControlarCargaCamionVariosCommand,
                    CrearCargaCamionVariosCommand,
                    ModificarCargaCamionVariosCommand> {
  constructor(protected readonly api: ApiService) {
    super(api);
    this.apiRoute = 'control-carga-camion-varios';
  }

  getViajeCarga(id: number): Observable<MovimientoCargaCamionVarios> {
    const route = 'viajes/insumo-varios';
    return this.api.get<MovimientoCargaCamionVarios>(`${route}/${id}`);
  }

  updateDatosOrdenCarga(command: ModificarDatosOrdenCargaCamionInsumoVariosCommand): Observable<number> {
    return this.api.put(`${this.apiRoute}/modificar-datos-orden-carga`, command);
  }
}
