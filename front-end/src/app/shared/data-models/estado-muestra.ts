import { EntityWithDescription } from '../../core/models/entity-with-description';

export class EstadoMuestra extends EntityWithDescription {

    constructor(id: number, descripcion?: string) {
        super(id, descripcion);
      }
}
