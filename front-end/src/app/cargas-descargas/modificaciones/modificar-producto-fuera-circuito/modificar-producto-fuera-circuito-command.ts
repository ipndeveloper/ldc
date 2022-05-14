import { RubroCalidadMovimientoCereal } from '../../../shared/data-models/ingreso-calidad/rubro-calidad-movimiento-cereal';

export class ModificarProductoFueraCircuitoCommand {
    fechaStockSan: string;
    idProducto: number;
    idCampoEpaSustentable: number;
    idCosecha: number;
    idProcedencia: number;
    esSustentable: boolean;
    idSilo: number;
    rubrosCalidad: RubroCalidadMovimientoCereal[];
    factor: number;
    idGrado: number;

    constructor(public readonly id: number, public readonly idTipoProducto) {}
}
