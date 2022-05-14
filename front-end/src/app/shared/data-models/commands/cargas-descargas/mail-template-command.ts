
export class MailTemplateCommand  {
    id: number;
    idTerminal: number;
    idTipoNotificacion: number;
    idMotivo: number;
    idEstado: number;
    asunto: string;
    cuerpo: string;
    destinatarios: DestinatarioCommand[];
}

export class DestinatarioCommand {
    id: number;
    idTipo: number;
    idRol?: number;
    idUsuario?: number;
    mail?: string;
}

export class CrearMailTemplateCommand extends MailTemplateCommand { }
export class ModificarMailTemplateCommand extends MailTemplateCommand { }
