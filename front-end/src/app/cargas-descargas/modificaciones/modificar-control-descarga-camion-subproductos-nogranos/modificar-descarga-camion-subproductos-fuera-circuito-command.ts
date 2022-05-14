import { ModificarDescargaCamionSubproductosFueraPuestoCommand } from './modificar-descarga-camion-subproductoss-fuera-puesto-command';

export class ModificarDescargaCamionSubproductosFueraCircuitoCommand extends ModificarDescargaCamionSubproductosFueraPuestoCommand {
    fechaStockSan: string;
    constructor(idCircuito: number,
                idTipoDocumentoPorte: number,
                numeroDocumentoPorte: string) {
            super(idCircuito, idTipoDocumentoPorte, numeroDocumentoPorte);
    }
}
