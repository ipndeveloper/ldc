import { EntityWithDescription } from '../../core/models/entity-with-description';

export class CaracteristicaPorCircuitoDataView {
    public id: number;
    public circuito: EntityWithDescription;
    public actividad: EntityWithDescription;
    public caracteristica: EntityWithDescription;
    public habilitado: boolean;

    constructor() { }
}
