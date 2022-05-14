import { EntityWithDescription } from '../../core/models/entity-with-description';

export class Puerto extends EntityWithDescription {

  constructor(id: number, descripcion: string, public readonly esAcopio: boolean) {
    super(id, descripcion);
  }
}
