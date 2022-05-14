import { EntityWithDescription } from '../../core/models/entity-with-description';

export class LugarDescarga extends EntityWithDescription {
    constructor(id: number, descripcion: string) {
        super(id, descripcion);
    }
    proteinaMin: number;
    proteinaMax: number;
    humedadMin: number;
    humedadMax: number;
    grado: number;
}
