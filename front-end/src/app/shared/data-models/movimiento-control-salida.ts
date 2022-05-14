import { Movimiento } from './movimiento';
import { Sociedad } from './sociedad';

export class MovimientoControlSalida extends Movimiento {
    entregadorRazonSocial: string;
    estadoCupo: string;
    nroCupo: string;
    titularRazonSocial: string;
    turno: string;
    vendedorRazonSocial: string;
    tipoTransporte: string;
    idImpresoraDefault?: number;
    mascara: string;
    establecimientoDestino: string;
    intermediario: Sociedad;
    remitenteComercial: Sociedad;
    establecimientoDestinoRazonSocial: string;
    destinatarioRazonSocial: string;
    codAfipLocalidadDestino: string;
    codAfipProvinciaDestino: string;
}
