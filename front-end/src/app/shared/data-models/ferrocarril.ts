import { EntityWithHints } from '../../core/models/entity-with-hints';

export class Ferrocarril extends EntityWithHints {

  constructor(id: number,
              codigo: string,
              descripcion: string,
              sugerencias: string) {
    super(id, codigo, descripcion, sugerencias);
  }
}
