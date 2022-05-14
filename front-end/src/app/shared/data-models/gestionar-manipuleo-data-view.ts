import { EntityWithDescription } from '../../core/models/entity-with-description';
import { ProductoDataView } from './producto-data-view';

export class GestionarManipuleoDataView {

    constructor() {
    }

    public id: number;
    public plataforma: EntityWithDescription;
    public puntoCarga: EntityWithDescription;
    public tipoTransporte: EntityWithDescription;
    public tipoMovimiento: EntityWithDescription;
    public estaHabilitado: boolean;
    public silo: EntityWithDescription;
    public producto: ProductoDataView;
    public grado: EntityWithDescription;
    public proteinaMinimo: number;
    public proteinaMaximo: number;
    public humedadMinimo: number;
    public humedadMaximo: number;
    public determinaGrado: boolean;
}
