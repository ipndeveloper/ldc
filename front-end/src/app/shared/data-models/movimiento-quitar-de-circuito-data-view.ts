import { Movimiento } from './movimiento';

export class MovimientoQuitarDeCircuitoDataView extends Movimiento {
    tipoTransporte: string;
    tipoDocumentoPorteDescripcion: string;
    numeroVagon: number  | null;
    numeroViaje: number  | null;
    ordenCarga: number | null;
    estadoCupo: string;
    nroCupo: string;
    titularRazonSocial: string;
    entregadorRazonSocial: string;
    vendedorRazonSocial: string;
    turnoPlaya: string;
    fechaIngreso: string;
    idTerminal: number;
}
