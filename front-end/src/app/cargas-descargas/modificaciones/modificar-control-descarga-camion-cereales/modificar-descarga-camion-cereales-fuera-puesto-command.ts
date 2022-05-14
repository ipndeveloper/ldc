import { ControlarDescargaCerealesCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-cereales-command';

export class ModificarDescargaCerealesFueraPuestoCommand extends ControlarDescargaCerealesCommand {
    esFueraCircuito: boolean;

    constructor(idCircuito: number,
                idTipoDocumentoPorte: number,
                numeroDocumentoPorte: string) {
            super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
    }
}
