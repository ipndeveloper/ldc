import { ControlarDescargaCamionInsumosCommand } from './controlar-descarga-camion-insumos-command';

export class DejarPendienteDescargaCamionInsumosCommand
     extends ControlarDescargaCamionInsumosCommand {

    public observacionDelMotivo: string;

    constructor(public readonly idCircuito: number,
                public readonly idTipoDocumentoPorte: number,
                public readonly numeroDocumentoPorte: string,
                public readonly idTransportista: number,
                public readonly idProducto: number,
                public readonly idTarjeta: number,
                public patenteCamion: string) {
        super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
        this.idTransportista = idTransportista;
    }
}
