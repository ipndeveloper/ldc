import { ControlarDescargaCamionSubproductosCommand } from '../../../shared/data-models/commands/cargas-descargas/controlar-descarga-camion-subproductos-command';

export class ModificarDescargaCamionSubproductosFueraPuestoCommand extends ControlarDescargaCamionSubproductosCommand {
    esFueraCircuito: boolean;

    constructor(idCircuito: number,
                idTipoDocumentoPorte: number,
                numeroDocumentoPorte: string) {
            super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
    }
}
