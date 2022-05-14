import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ActividadCircuitoDataView {
    id: number;
    circuito: EntityWithDescription;
    estadoInicial: EntityWithDescription;
    actividad: EntityWithDescription;
    habilitado: boolean;
    resultados: ResultadoActividadCircuitoDataView[];
}

export class ResultadoActividadCircuitoDataView {
    id: number;
    resultado: EntityWithDescription;
    habilitado: boolean;
    estadoFinal: EntityWithDescription;
}
