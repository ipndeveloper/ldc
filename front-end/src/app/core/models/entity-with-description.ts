import { Entity } from '../../core/models/entity';

export class EntityWithDescription extends Entity {
    constructor(id: number, readonly descripcion?: string) {
        super(id);
    }
}
