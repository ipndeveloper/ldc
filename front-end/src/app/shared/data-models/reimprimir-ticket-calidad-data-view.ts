import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ReimprimirTicketCalidadDataView {

    constructor() {
    }

    public id: number;
    public tipoDocumentoPorte: string;
    public nroDocumentoPorte: string;
    public ctg: number;
    public producto: string;
    public estado: string;
    public impresoraDefectoUsuario: EntityWithDescription;
}
