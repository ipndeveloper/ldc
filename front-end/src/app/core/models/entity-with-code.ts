import { EntityWithDescription } from './entity-with-description';

export class EntityWithCode extends EntityWithDescription {
  constructor(id: number, readonly codigo: string, descripcion: string) {
    super(id, descripcion);
  }
}
