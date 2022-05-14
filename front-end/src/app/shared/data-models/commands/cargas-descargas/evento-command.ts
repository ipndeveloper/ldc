export class EventoCommand {
    id: number;
    idTipoEvento: number;
    tipoEvento: string;
    requiereAccion: boolean;
    mensajeDashboard: string;
    mensajeArchestra: string;
    enviaDashboard: boolean;
    enviaEmail: boolean;
    enviaArchestra: boolean;
}

export class CrearEventoCommand extends EventoCommand { }
export class ModificarEventoCommand extends EventoCommand { }
