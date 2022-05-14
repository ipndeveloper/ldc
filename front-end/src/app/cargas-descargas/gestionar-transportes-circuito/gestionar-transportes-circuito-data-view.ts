import { EntityWithCode } from '../../core/models/entity-with-code';

export class GestionarTransportesCircuitoDataView {
    id: number;
    fechaEntrada: string;
    estado: EntityWithCode;
    producto: string;
    idTipoProducto: number;
    tipoDocumentoPorte: string;
    numeroDocumentoPorte: string;
    camionVagon: string;
    tarjeta: number;
    tipoMovimiento: string;
    idTipoMovimiento: number;
    tipoTransporte: string;
    idTipoTransporte: number;
}
