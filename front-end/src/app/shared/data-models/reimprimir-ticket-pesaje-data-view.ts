import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ReimprimirTicketPesajeDataView {
    public impresoraDefectoUsuario: EntityWithDescription;
    public listaMovimientos: MovimientoTicketPesajeDataView[];
}

export class MovimientoTicketPesajeDataView {
    constructor() {
    }

    public id: number;
    public tipoMovimiento: string;
    public tipoDocPorte: string;
    public nroDocPorte: string;
    public ctg: number;
    public patente: string;
    public nroTicket: string;
    public producto: string;
    public cosecha: string;
    public vendedor: string;
    public destinatario: string;
    public vagon: string;
    public tipoTransporte: string;
}
