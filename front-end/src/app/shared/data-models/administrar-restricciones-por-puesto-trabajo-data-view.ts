import { EntityWithDescription } from '../../core/models/entity-with-description';

export class AdministrarRestriccionesPorPuestoTrabajoDataView {
    public id: number;
    public permiso: EntityWithDescription;
    public terminal: EntityWithDescription;
    public puestoTrabajo: EntityWithDescription;
}
