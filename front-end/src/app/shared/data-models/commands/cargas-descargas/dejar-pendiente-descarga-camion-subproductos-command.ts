import { ControlarDescargaCamionSubproductosCommand } from './controlar-descarga-camion-subproductos-command';

export class DejarPendienteDescargaCamionSubproductosCommand
    extends ControlarDescargaCamionSubproductosCommand {

    public observacionDelMotivo: string;

    constructor( public readonly idCircuito: number, public readonly idTipoDocumentoPorte: number,
                 public readonly numeroDocumentoPorte: string) {
                    super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
    }
}
