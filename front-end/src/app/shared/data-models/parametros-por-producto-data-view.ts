import { EntityWithCode } from '../../core/models/entity-with-code';

export class ParametrosPorProductoDataView {
    public id: number;
    public producto: EntityWithCode;
    public tipoProductoDescarga: EntityWithCode;
    public tipoProductoCarga: EntityWithCode;
    public analisisPorTecnologia: boolean;
    public tipoCoeficienteConversionLitros: number;
    public coeficienteConversionLitros: number;
    public equivalenciaArchestra: number;
    public valorLimiteHumedadParaRechazo: number;
}
