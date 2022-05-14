export class ModificarParametrosPorProductoCommand  {
  idProducto: number;
  idTipoProductoDescarga: number;
  idTipoProductoCarga: number;
  requiereAnalisisPorTecnologia: boolean;
  idTipoCoeficienteConversionLitros: number | null;
  coeficienteConversionLitros: number | null;
  codigoArchestra: number | null;
  valorLimiteHumedadParaRechazo: number | null;
}

