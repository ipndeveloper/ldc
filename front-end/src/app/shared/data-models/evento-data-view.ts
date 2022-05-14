import { TipoEvento } from './tipo-evento';

export class EventoDataView {
    id: number;
    idTipoEvento: number;
    tipoEvento: TipoEvento;
    accion: string;
    requiereAccion: boolean;
    mensajeDashboard: string;
    mensajeArchestra: string;
    enviaDashboard: string;
    enviaEmail: string;
    enviaArchestra: string;
}
