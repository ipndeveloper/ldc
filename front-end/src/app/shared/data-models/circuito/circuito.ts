import { ActividadesCircuito } from '../actividades-circuito';
import { CaracteristicaCircuito } from '../caracteristica-circuito';
import { Movimiento } from '../movimiento';
import { EstadosMovimiento, Caracteristicas } from '../../enums/enums';

export class Circuito {

  constructor() {
  }

  public actividadesCircuito: ActividadesCircuito[];
  public caracteristicasCircuito: CaracteristicaCircuito[];
  public idTipoTransporte: number;
  public idTipoMovimiento: number;
  public idTipoProducto: number;
  public id: number;

  public validarMovimiento(movimiento: Movimiento | null): boolean {

    if (movimiento && this.id === movimiento.circuito.id) {
      return this.validarEstado(movimiento.estado.id);
    }

    return this.validarEstado(EstadosMovimiento.EstadoNinguno);
  }

  public validarMovimientoPorEstadoYCircuito(idEstado: number, idCircuito: number) {
    if (this.id === idCircuito) {
      return this.validarEstado(idEstado);
    }

    return this.validarEstado(EstadosMovimiento.EstadoNinguno);
  }

  private validarEstado(idEstado: number): boolean {
    return this.actividadesCircuito.some(function (obj) {
      return obj.idEstadoInicial === idEstado;
    });
  }

  public validarMovimientoActividad(movimiento: Movimiento | null, idActividad: number): boolean {
    if (movimiento && this.id === movimiento.circuito.id) {
      return this.validarEstadoActividad(movimiento.estado.id, idActividad);
    }
    return false;
  }

  public validarEstadoActividad(idEstado: number, idActividad: number): boolean {
    return this.actividadesCircuito.some(function (obj) {
      return obj.idEstadoInicial === idEstado && obj.idActividad === idActividad;
    });
  }

  public validarMovimientoById(idMovimiento: number, idCircuito: number, idEstado: number): boolean {

    if (idMovimiento && this.id === idCircuito) {
      return this.validarEstado(idEstado);
    }

    return this.validarEstado(EstadosMovimiento.EstadoNinguno);
  }

  public debeActivarCaracteristica(caracteristicas: Caracteristicas[]): boolean {
    const caracteristica = this.caracteristicasCircuito.some(e => e.estaHabilitada && e.estaHabilitada === true &&
      caracteristicas.some(c => c === e.idCaracteristica));

    return caracteristica;
  }

  public debeActivarCaracteristicaPorActividad(caracteristicas: Caracteristicas[], idActividad: number): boolean {
    const caracteristica = this.caracteristicasCircuito.some(e => e.estaHabilitada && e.idActividad === idActividad &&
      caracteristicas.some(c => c === e.idCaracteristica));

    return caracteristica;
  }

  public poseeActividad(idActividad: number): boolean {
    return this.actividadesCircuito.some((ac: ActividadesCircuito) => ac.idActividad === idActividad);
  }
}


