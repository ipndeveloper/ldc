import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Producto } from './producto';

export class EquivalenciaRubrosDataView {
    id: number;
    camara: EntityWithDescription;
    producto: Producto;
    rubro: EntityWithDescription;
    codigo: number;
    codigoTipo: string;
    habilitado: boolean;
}
