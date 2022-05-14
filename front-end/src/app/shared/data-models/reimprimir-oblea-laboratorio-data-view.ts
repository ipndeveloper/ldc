import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ReimprimirObleaLaboratorioDataView {
    constructor() { }

    public id: number;
    public patenteCamion: string;
    public patenteAcoplado: string;
    public producto: string;
    public estadoMovimiento: string;
    public impresoraDefectoUsuario: EntityWithDescription;
}
