import { EntityWithDescription } from '../../core/models/entity-with-description';

export class DecisionCalidad extends EntityWithDescription {

  constructor(id: number, descripcion: string) {
    super(id, descripcion);
  }
}
