import { Movimiento } from './movimiento';

export class MovimientoQuitarDeCircuito extends Movimiento {
    idTipoProducto: number;
    tipoDocumentoPorteDescripcion: string;
    estadoCupo: string;
    nroCupo: string;
    titularRazonSocial: string;
    entregadorRazonSocial: string;
    turno: string;
    fechaIngreso: string;
    idTerminal: number;
}
