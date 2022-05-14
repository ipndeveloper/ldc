import { Injectable } from '@angular/core';
import { ApiService } from '../../../core/services/restClient/api.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { Observable } from 'rxjs';
import { TiposProducto, TiposTransporte } from '../../../shared/enums/enums';
import { DesmarcarMovimientoEnPuestoCommand } from '../data-models/desmarcar-movimiento-en-puesto-command';
import { MarcarMovimientoEnPuestoCommand } from '../data-models/marcar-movimiento-en-puesto-command';
import { PreCargaMovimientoDataView } from '../../../shared/data-models/precarga-movimiento-data-view';
import { ModalSeleccionarRemitoDataView } from '../../../shared/data-models/modal-seleccionar-remito-data-view';
import { MuestraTabCalidadDataView } from '../../../shared/data-models/muestra-tab-calidad-data-view';
import { ModalSeleccionarMovimientoDataView } from '../../../shared/data-models/modal-seleccionar-movimiento-data-view';

@Injectable()
export class MovimientoService<T extends Movimiento = Movimiento> {

  constructor(private readonly apiService: ApiService) { }

  getMovimientoDescarga(idMovimiento: number | null, idTipoProducto: number, idTipoTransporte: number): Observable<T> {
    let endpoint;

    if (idTipoTransporte === TiposTransporte.Camion) {
      switch (idTipoProducto) {
        case TiposProducto.Cereal:
          endpoint = 'control-descarga-camion-cereales';
          break;
        case TiposProducto.NoGranos:
        case TiposProducto.SubProductos:
          endpoint = 'control-descarga-camion-subproductos';
          break;
        case TiposProducto.Varios:
          endpoint = 'control-descarga-camion-transportes-varios';
          break;
        case TiposProducto.InsumosLiquidos:
        case TiposProducto.Insumos:
          endpoint = 'control-descarga-camion-insumos';
          break;
      }
    } else {
      switch (idTipoProducto) {
        case TiposProducto.Cereal:
          endpoint = 'control-descarga-vagon-cereales';
          break;
        case TiposProducto.NoGranos:
        case TiposProducto.SubProductos:
          endpoint = 'control-descarga-vagon-no-granos';
          break;
      }
    }

    const url = `${endpoint}?idMovimiento=${idMovimiento}&idTipoProducto=${idTipoProducto}`;

    return this.apiService.get<T>(url);
  }

  getMovimientoCarga(idMovimiento: number | null, idTipoProducto: number): Observable<T> {
    let endpoint;

    switch (idTipoProducto) {
      case TiposProducto.Cereal:
      case TiposProducto.NoGranos:
      case TiposProducto.SubProductos:
        endpoint = 'control-carga-camion';
        break;
      case TiposProducto.Varios:
      case TiposProducto.Insumos:
      default:
        endpoint = 'control-carga-camion-varios';
        break;
    }
    return this.apiService.get<T>(`${endpoint}/${idMovimiento}`);
  }


  getMovimientoVagonPorNroDocPorte(idTipoProducto: number, numeroDocumentoPorte: string, idCircuito: number): Observable<T> {
    let endpoint: string;

    if (idTipoProducto === TiposProducto.Cereal) {
      endpoint = 'control-descarga-vagon-cereales';
    } else {
      endpoint = 'control-descarga-vagon-no-granos';
    }

    let filtros = `filtros?numeroDocumentoPorte=${numeroDocumentoPorte}`;
    filtros += `&idCircuito=${idCircuito}`;

    return this.apiService.get<T>(`${endpoint}/${filtros}`);
  }

  getPreCargaMovimientoPorNroDocPorte(idCircuito: number, numeroDocumentoPorte: string, ctg: string):
    Observable<ModalSeleccionarMovimientoDataView[]> {
    const endpoint = 'control-descarga-camion-cereales';

    const url = `${endpoint}/pre-carga/?idCircuito=${idCircuito}&numeroDocumentoPorte=${numeroDocumentoPorte}&ctg=${ctg}`;

    return this.apiService.get(url);
  }

  getPreCargaMovimientoCerealPorId(id: number): Observable<PreCargaMovimientoDataView> {
    const endpoint = 'control-descarga-camion-cereales';

    const url = `${endpoint}/pre-carga/${id}`;

    return this.apiService.get(url);
  }

  getPreCargaMovimientoSubproductoPorNroDocPorte(idCircuito: number,
                                                 numeroDocumentoPorte: string): Observable<ModalSeleccionarRemitoDataView[]> {
    const endpoint = 'control-descarga-camion-subproductos';

    const url = `${endpoint}/pre-carga?idCircuito=${idCircuito}&numeroDocumentoPorte=${numeroDocumentoPorte}`;

    return this.apiService.get(url);
  }

  getPreCargaMovimientoSubproductoPorId(id: number): Observable<PreCargaMovimientoDataView> {
    const endpoint = 'control-descarga-camion-subproductos';

    const url = `${endpoint}/pre-carga/${id}`;

    return this.apiService.get(url);
  }

  desmarcarMovimientoEnPuesto(idMovimiento: number) {
    const url = `movimientos/${idMovimiento}/desmarcar-en-puesto`;

    return this.apiService.patch(url, new DesmarcarMovimientoEnPuestoCommand(idMovimiento));
  }

  marcarMovimientoEnPuesto(idMovimiento: number) {
    const url = `movimientos/${idMovimiento}/marcar-en-puesto`;

    return this.apiService.patch(url, new MarcarMovimientoEnPuestoCommand(idMovimiento));
  }

  movimientoEstaEnPuesto(idMovimiento: number) {
    const url = `movimientos/${idMovimiento}/en-puesto`;

    return this.apiService.get<boolean>(url);
  }

  movimientosDocPorteEstanEnPuesto(nroDocPorte: string) {
    const url = `movimientos/docporte/${nroDocPorte}/en-puesto`;

    return this.apiService.get<boolean>(url);
  }

  getVersionDeMovimiento(idMovimiento: number): Observable<string> {
    const url = `movimientos/${idMovimiento}/version`;

    return this.apiService.get<string>(url);
  }

  getDebeMostrarTabCalidad(idMovimiento: number): Observable<MuestraTabCalidadDataView> {
    const url = `movimientos/${idMovimiento}/muestra-tab-calidad`;

    return this.apiService.get(url);
  }
}
