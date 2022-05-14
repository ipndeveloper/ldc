import { Entity } from '../../core/models/entity';

export class Sociedad extends Entity {
    constructor(id: number, public readonly razonSocial: string) {
        super(id);
    }
}
