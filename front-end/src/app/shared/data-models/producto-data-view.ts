import { TipoProducto } from './tipo-producto';
import { EntityWithCode } from '../../core/models/entity-with-code';

export class ProductoDataView {
    public producto: EntityWithCode;
    public tipoProductoDescarga: TipoProducto;
    public tipoProductoCarga: TipoProducto;
    public analisisPorTecnologia: boolean;
    public valorLimiteHumedadParaRechazo: number;
    public tipoCoeficienteConversionLitros: string;
    public coeficienteConversionLitros: number;
    public equivalenciaArchestra: number;
    public determinaGrado: boolean;
}
