import { EntityWithDescription } from '../../core/models/entity-with-description';

export class TipoPuestoTrabajo extends EntityWithDescription {

    constructor(id: number,
        descripcion: string) {

        super(id, descripcion);
    }
}
