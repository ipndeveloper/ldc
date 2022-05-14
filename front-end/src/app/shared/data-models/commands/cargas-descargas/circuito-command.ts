export class CircuitoCommand  {
    id: number;
    nombre: string;
    idTerminal: number;
    idTipoMovimiento: number;
    idTipoTransporte: number;
    idTipoProducto: number;
    habilitado: boolean;
    idsFinalidades: number[];
    motivosErrorBalanzaEntrada: MotivoErrorBalanzaCircuitoCommand[];
    motivosErrorBalanzaSalida: MotivoErrorBalanzaCircuitoCommand[];
    idCircuitoReferencia?: number;
}

export class CrearCircuitoCommand extends CircuitoCommand { }
export class ModificarCircuitoCommand extends CircuitoCommand { }

export class MotivoErrorBalanzaCircuitoCommand {
    id: number;
    habilitado: boolean;
}
