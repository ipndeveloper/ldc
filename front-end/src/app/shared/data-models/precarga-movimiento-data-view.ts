import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Producto } from './producto';
import { EntityWithCode } from '../../core/models/entity-with-code';
import { CampoEpaSustentable } from './campo-epa-sustentable';

export class PreCargaMovimientoDataView extends EntityWithDescription {
    idCodigoCupo: number;
    codigoCupo: string;
    estadoCodigoCupo: string;
    documentoPorte: string;
    turnoPlaya: string;
    producto: Producto;
    titular: EntityWithCode;
    vendedor: EntityWithCode;
    corredorComprador: EntityWithCode;
    destinatario: EntityWithCode;
    finalidad: EntityWithDescription;
    sedeVendedor: EntityWithCode;
    sedeDestinatario: EntityWithCode;
    ctg: number;
    codigoCancelacionCtg: string;
    transportista: EntityWithCode;
    chofer: EntityWithCode;
    sinConfirmarCtg: boolean;
    KgsNeto: number;
    version: string;
    confirmoCtg: boolean;
    cosecha: EntityWithDescription;
    campoEpaSustentable: CampoEpaSustentable;
    procedencia: EntityWithCode;
    numeroTarjeta: string;
    estadoMovimiento: string;
    idTipoProducto: number;
    motivoCupo: EntityWithDescription;
    usuarioCupoSAN: string;
    numeroCEE: number;
    confirmadoManualmente: boolean;
}
