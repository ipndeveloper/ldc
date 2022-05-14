import { EntityWithDescription } from '../../core/models/entity-with-description';

export class TipoDispositivo extends EntityWithDescription {

    constructor(id: number,
        descripcion: string) {

        super(id, descripcion);
    }
}

