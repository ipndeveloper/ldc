import { EntityWithDescription } from '../../core/models/entity-with-description';

export class AdministrarProductosHablitadosPorTerminalDataView {
    public id: number;
    public terminal: EntityWithDescription;
    public producto: EntityWithDescription;
    public habilitado: string;
}
