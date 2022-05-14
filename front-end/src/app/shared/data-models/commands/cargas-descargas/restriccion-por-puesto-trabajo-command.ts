export class RestriccionPorPuestoTrabajoCommand {
    IdPuestoTrabajo: number;
    IdPermiso: number;

}

export class CrearRestriccionPorPuestoTrabajoCommand extends RestriccionPorPuestoTrabajoCommand {}
export class EliminarRestriccionPorPuestoTrabajoCommand extends RestriccionPorPuestoTrabajoCommand {}
export class ModificarRestriccionPorPuestoTrabajoCommand extends RestriccionPorPuestoTrabajoCommand {
    IdNuevoPermiso: number;
}
