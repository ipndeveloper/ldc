import { EntityWithDescription } from '../../core/models/entity-with-description';

export class TipoCartaPorte extends EntityWithDescription {
  constructor(id: number, descripcion: string) {
    super(id, descripcion);
  }
}
