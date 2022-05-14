import { EntityWithDescription } from '../../core/models/entity-with-description';

export class Accion extends EntityWithDescription {

    constructor(id: number,
        descripcion: string) {

        super(id, descripcion);
    }
}
