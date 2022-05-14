import { EntityWithDescription } from '../../../../core/models/entity-with-description';

export class MotivoNoDescarga extends EntityWithDescription {
    constructor(id: number, descripcion: string) {
        super(id, descripcion);
    }

    checked: boolean;
    esBloqueante: boolean;
    esEditable: boolean;
    prioridad: number;
}
