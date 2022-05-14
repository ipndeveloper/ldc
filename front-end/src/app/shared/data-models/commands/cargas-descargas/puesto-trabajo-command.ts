export class PuestoTrabajoCommand  {
    id: number;
    idTerminal: number;
    idTipoPuestoTrabajo: number;
    nombre: string;
    direccionIP: string;
    habilitado: boolean;
    utilizaTarjeta: boolean;
    accionesPuestoTrabajo: AccionPuestoTrabajoCommand[];
    dispositivosPuestoTrabajo: DispositivoPuestoTrabajoCommand[];
}

export class AccionPuestoTrabajoCommand {
    id: number;
    idAccion: number;
    automatico: boolean;
    habilitado: boolean;
}

export class DispositivoPuestoTrabajoCommand {
    id: number;
    idTipoDispositivo: number;
    idDispositivo: number;
    habilitado: boolean;
}

export class CrearPuestoTrabajoCommand extends PuestoTrabajoCommand { }
export class ModificarPuestoTrabajoCommand extends PuestoTrabajoCommand { }
