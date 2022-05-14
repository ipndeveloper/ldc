export class AsignarTarjetaCommand {

    constructor(public readonly idMovimiento: number, public readonly numeroTarjeta: number) { }
}

export class AsignarTarjetaPorDocumentoPorteYPatenteCommand {
    idTipoDocumentoPorte: number;
    numeroDocumentoPorte: string;
    ctg: number;
    patente: string;
    numeroTarjeta: string;
}
