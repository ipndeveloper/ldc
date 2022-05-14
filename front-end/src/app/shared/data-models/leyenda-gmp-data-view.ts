import { EntityWithCode } from '../../core/models/entity-with-code';
import { EntityWithDescription } from '../../core/models/entity-with-description';

export class LeyendaGmpDataView {
    public id: number;
    public terminal: EntityWithDescription;
    public sociedad: EntityWithCode;
    public producto: EntityWithCode;
    public leyendaGmp: string;
    public habilitado: boolean;
}
