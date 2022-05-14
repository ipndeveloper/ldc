import { EntityWithDescription } from '../../core/models/entity-with-description';

export class MailTemplateDataView {
    public id: number;
    public terminal: EntityWithDescription;
    public tipoNotificacion: EntityWithDescription;
    public motivo: EntityWithDescription;
    public estado: EntityWithDescription;
    public asunto: string;
    public cuerpo: string;
    public destinatarios: DestinatarioDataView[];
}

export class DestinatarioDataView {
    public id: number;
    public tipo: EntityWithDescription;
    public rol: EntityWithDescription;
    public usuario: EntityWithDescription;
    public mail: string;
}
