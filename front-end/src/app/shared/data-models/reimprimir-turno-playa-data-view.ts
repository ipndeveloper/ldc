import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ReimprimirTurnoPlayaDataView {
    id: number;
    idTipoMovimiento: number;
    idEstadoMovimiento: number;
    numeroControl: string;
    producto: string;
    codigoCupo: string;
    estadoCupo: string;
    remitenteComercial: string;
    corredor: string;
    destinatario: string;
    finalidad: string;
    impresoraDefectoUsuario: EntityWithDescription;
}
