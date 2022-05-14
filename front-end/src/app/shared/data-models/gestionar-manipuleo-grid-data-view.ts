import { EntityWithDescription } from '../../core/models/entity-with-description';

export class GestionarManipuleoGridDataView {

    constructor() {
    }

    public id: number;
    public plataforma: string;
    public tipoTransporte: string;
    public tipoMovimiento: EntityWithDescription;
    public silo: string;
    public producto: string;
    public grado: string;
    public estaHabilitado: string;
    public proteinaMinimo: number;
    public proteinaMaximo: number;
    public humedadMinimo: number;
    public humedadMaximo: number;
}
