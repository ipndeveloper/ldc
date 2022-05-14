import { EntityWithDescription } from '../../core/models/entity-with-description';

export class CondicionManipuleo extends EntityWithDescription {
    constructor(id: number, descripcion: string) {
        super(id, descripcion);
    }
    proteinaMin: number | null;
    proteinaMax: number | null;
    humedadMin: number | null;
    humedadMax: number | null;
    grado: number | null;
}
