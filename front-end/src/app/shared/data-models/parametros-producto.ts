import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ParametrosProducto {
    cosechaPorDefecto: EntityWithDescription;
    tipoProductoDescarga: EntityWithDescription;
    tipoProductoCarga: EntityWithDescription;
    analisisPorTecnologia: boolean;
    tipoCoeficienteConversionLitros: EntityWithDescription;
    coeficienteConversionLitros: number;
    equivalenciaArchestra: string;
    valorLimiteHumedadParaRechazo: number | null;
}
