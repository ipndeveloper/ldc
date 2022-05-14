import { ControlarDescargaCerealesCommand } from './controlar-descarga-camion-cereales-command';

export class DejarPendienteDescargaCamionCerealesCommand
    extends ControlarDescargaCerealesCommand {

    public observacionDelMotivo: string;

    constructor( public readonly idCircuito: number, public readonly idTipoDocumentoPorte: number,
                 public readonly numeroDocumentoPorte: string) {
                    super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
    }
}
