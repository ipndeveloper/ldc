import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ReferenciaDestino extends EntityWithDescription {
  constructor(id: number, descripcion: string) {
    super(id, descripcion);
  }
}
