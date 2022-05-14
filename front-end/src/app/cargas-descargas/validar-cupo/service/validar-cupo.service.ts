import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { CrearPreingresoCommand } from '../../../shared/data-models/commands/cargas-descargas/crear-preingreso-command';
import { Observable } from 'rxjs';
import { TiposProducto } from '../../../shared/enums/enums';
import { MovimientoCupo } from '../../../shared/data-models/movimiento-cupo';
import { ModificarValidacionCupoFueraPuestoCommand } from '../../../shared/data-models/commands/cargas-descargas/modificar-validacion-cupo-fuera-puesto-command';

@Injectable({
  providedIn: 'root'
})
export class ValidarCupoService {
  apiRoute: string;
  endpoint: string;

  constructor(protected readonly api: ApiService) {
    this.apiRoute = 'validar-precarga-cupo/';
  }


  getMovimiento(idMovimiento: number | null): Observable<MovimientoCupo> {
    const url = `${this.apiRoute}${idMovimiento}`;

    return this.api.get<MovimientoCupo>(url);
  }


  create(command: CrearPreingresoCommand, idTipoProducto: number): Observable<void> {
    switch (idTipoProducto) {
      case TiposProducto.Cereal:
          this.endpoint = 'cereales';
          break;
      case TiposProducto.SubProductos:
      case TiposProducto.NoGranos:
          this.endpoint = 'subproducto-nograno';
          break;
    }
    const route = this.apiRoute + this.endpoint;
  return this.api.post(route, command);
  }

  modificarFueraPuesto(command: ModificarValidacionCupoFueraPuestoCommand, idTipoProducto: number): Observable<void> {
    switch (idTipoProducto) {
      case TiposProducto.Cereal:
          this.endpoint = 'modificar-cereal-fuera-puesto';
          break;
      case TiposProducto.SubProductos:
      case TiposProducto.NoGranos:
          this.endpoint = 'modificar-subproducto-nograno-fuera-puesto';
          break;
    }
    const route = this.apiRoute + this.endpoint;
  return this.api.post(route, command);
  }

  DejarPendiente(command: CrearPreingresoCommand, idTipoProducto: number): Observable<void> {
    switch (idTipoProducto) {
      case TiposProducto.Cereal:
          this.endpoint = 'dejar-pendiente-cereales';
          break;
      case TiposProducto.SubProductos:
      case TiposProducto.NoGranos:
          this.endpoint = 'dejar-pendiente-subproducto-nograno';
          break;
    }
    const route = this.apiRoute + this.endpoint;
    return this.api.post(route, command);
  }
}
