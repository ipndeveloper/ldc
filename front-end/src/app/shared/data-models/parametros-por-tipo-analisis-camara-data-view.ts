import { EntityWithCode } from '../../core/models/entity-with-code';
import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ParametrosPorTipoAnalisisCamaraDataView {
    public terminal: EntityWithDescription;
    public producto: EntityWithCode;
    public tipoAnalisis: EntityWithDescription;
    public esEspecial: boolean;
    public codigoCamara: number;
}
