import { EntityWithDescription } from '../../core/models/entity-with-description';

export class TipoEvento extends EntityWithDescription {

    constructor(id: number,
        descripcion: string) {

        super(id, descripcion);
    }
}

