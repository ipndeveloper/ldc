export class CaracteristicaCircuitoCommand {
    id: number;
    IdCircuito: number;
    IdActividad: number;
    IdCaracteristica: number;
    habilitado: boolean;
}

export class CrearCaracteristicaCircuitoCommand extends CaracteristicaCircuitoCommand {}
export class ModificarCaracteristicaCircuitoCommand extends CaracteristicaCircuitoCommand {}
