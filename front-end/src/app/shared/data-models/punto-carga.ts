import { Entity } from '../../core/models/entity';
import { EntityWithDescription } from '../../core/models/entity-with-description';

export class PuntoCarga extends Entity {
    terminal: EntityWithDescription;
    descripcion: string;
    habilitado: boolean;
    capacidadMaxima: number;
}
