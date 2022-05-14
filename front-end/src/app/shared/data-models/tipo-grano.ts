import { EntityWithDescription } from '../../core/models/entity-with-description';

export class TipoGrano extends EntityWithDescription {
    constructor(id: number, description: string) {
        super(id, description);
      }
}
