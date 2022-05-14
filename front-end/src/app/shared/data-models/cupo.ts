import { Entity } from '../../core/models/entity';

export class Cupo extends Entity {
    constructor(id: number, public readonly descripcion: string) {
        super(id);
    }
}
