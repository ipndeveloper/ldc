import { ModificarDescargaCerealesFueraPuestoCommand } from './modificar-descarga-camion-cereales-fuera-puesto-command';

export class ModificarDescargaCamionCerealesFueraCircuitoCommand extends ModificarDescargaCerealesFueraPuestoCommand {
    fechaStockSan: string;
    constructor(idCircuito: number,
                idTipoDocumentoPorte: number,
                numeroDocumentoPorte: string) {
            super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
    }
}
