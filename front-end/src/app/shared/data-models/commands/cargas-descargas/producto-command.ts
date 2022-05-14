export class ProductoCommand  {
    id: number;
    idTipoProductoDescarga: string;
    idTipoProductoCarga: string;
    requiereAnalisisPorTecnologia: boolean;
    valorLimiteHumedadParaRechazo: number;
    idTipoCoeficienteConversionLitros: string;
    coeficienteConversionLitros: number;
    codigoArchestra: string;
}

export class CrearProductoCommand extends ProductoCommand { }
export class ModificarProductoCommand extends ProductoCommand { }
