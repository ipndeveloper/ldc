
export class ControlarDescargaCamionInsumosVariosCommand {

    id: number;
    idVendedor: number;
    idTransportista: number;
    numeroTarjeta: number;
    patenteCamion: string;
    patenteAcoplado: string;
    idProducto: number;
    kgBruto: number;
    kgTara: number;
    codigoFiscalTransportista: string;
    observaciones: string;
    esModificacion: boolean;
    version: string;

    constructor(public readonly idCircuito: number,
                public readonly idTipoDocumentoPorte: number,
                public readonly numeroDocumentoPorte: string) {
    }
}
