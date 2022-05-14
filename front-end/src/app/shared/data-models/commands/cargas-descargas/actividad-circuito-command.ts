export class ActividadCircuitoCommand  {
    id: number;
    idCircuito: number;
    idEstadoInicial: number;
    idActividad: number;
    habilitado: boolean;
    resultados: ResultadoActividadCircuitoCommand[];
}

export class CrearActividadCircuitoCommand extends ActividadCircuitoCommand { }
export class ModificarActividadCircuitoCommand extends ActividadCircuitoCommand { }

export class ResultadoActividadCircuitoCommand {
    id: number;
    habilitado: boolean;
    idResultado: number;
    idEstadoFinal: number | null;
}
