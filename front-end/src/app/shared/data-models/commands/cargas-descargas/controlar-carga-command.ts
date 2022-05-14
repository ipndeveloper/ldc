export class CargaCamionCommand {
    public id: number;
    public idViaje: number;
    public idCircuito: number;
    public fechaVencimiento: string;
    public idTipoDocumentoPorte: number;
    public numeroDocumentoPorte: string;
    public idTipoCartaPorte?: number;
    public numeroCEE: number;
    public numeroCOT: number;
    public observaciones: string;
    public idTipoPesada: number;
    public numeroTarjeta: string;
    public idTipoProducto: number;
    public idActividad: number;
    public version: string;
    public idCondicionManipuleo: number;
    public fechaStockSan: string;
    public numeroCTG: number;
    public idSedeDestino: number;
    public idSedeOrigen: number;
    public esVentaInterco: boolean;
    public idTipoGrano?: number;
    public tarifaFleteReferencia: number;
    public tarifaFletePorTn: number;
    public kilometrosRecorridos: number;
    public idVendedor: number;
}

export class ControlarCargaCamionCommand  extends CargaCamionCommand {}

export class ModificarCargaCamionCommand extends CargaCamionCommand {}
