import { EntityWithDescription } from '../../core/models/entity-with-description';

export class EstadoMovimiento extends EntityWithDescription {

    constructor(id: number, descripcion?: string) {
        super(id, descripcion);
      }
}
