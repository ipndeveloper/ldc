export class PagoTasaMunicipalCommand {
    id: number;
    idMovimiento: number;
    idMedioDePago: number;
    tarifa: number;
    idPagoMercadoPago: string;
    idOrdenMercadoPago: string;
    kgPesoBruto: number;
    idMoneda: number;
    NoPago: boolean;
    codigoQr: string;
    ticketDePago: string;
}
