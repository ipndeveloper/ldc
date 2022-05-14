import { EntityWithDescription } from '../../core/models/entity-with-description';
import { EntityWithCode } from '../../core/models/entity-with-code';
import { RubroPorTerminalDataView } from './rubro-por-terminal-data-view';
import { Grado } from './grado';
import { Silo } from './silo';

export class ProductosHablitadosPorTerminalDataView {
    public terminal: EntityWithDescription;
    public producto: EntityWithCode;
    public grupoAnalisisDefecto: EntityWithDescription;
    public gradosSeleccionados: Array<number>;
    public gradosNoSeleccionados: Array<Grado>;
    public habilitado: boolean;
    public silosSeleccionados: Array<number>;
    public silosNoSeleccionados: Array<Silo>;
    public rubros: Array<RubroPorTerminalDataView>;
    public cosechaPorDefecto: EntityWithCode;
    public leyendaNormaCalidad: String;
    public imprimeOblea: boolean;
    public cantidadCopiasOblea: number | null;
    public gestionaCot: boolean;
    public usaSustentabilidad: boolean;
}
