import { EntityWithCode } from '../../core/models/entity-with-code';

export class Cosecha extends EntityWithCode {

  constructor(id: number, codigo: string, descripcion: string) {
    super(id, codigo, descripcion);
  }
}
