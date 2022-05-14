export class DispositivoCommand  {
    id: number;
    idTerminal: number;
    nombre: string;
    idTipoDispositivo: number;
    numeroSerie: number;
    pathArchestra: string;
    idSentidoBalanza: number;
    habilitado: boolean;
    sinBalancero: boolean;
}

export class CrearDispositivoCommand extends DispositivoCommand { }
export class ModificarDispositivoCommand extends DispositivoCommand { }

