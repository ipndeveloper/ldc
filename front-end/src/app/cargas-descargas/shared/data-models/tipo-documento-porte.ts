import { EntityWithDescription } from '../../../core/models/entity-with-description';

export class TipoDocumentoPorte extends EntityWithDescription {

  mascara: string;

  constructor(id: number, description: string) {
    super(id, description);
  }
}
