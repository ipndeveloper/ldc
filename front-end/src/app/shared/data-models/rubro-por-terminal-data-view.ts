import { EntityWithDescription } from '../../core/models/entity-with-description';

export class RubroPorTerminalDataView {
    public id: number;
    public producto: EntityWithDescription;
    public rubroCalidad: EntityWithDescription;
    public orden: number;
    public maximo?: number;
    public minimo?: number;
    public requeridoSAN: boolean;
    public requeridoPlanta: boolean;
}
