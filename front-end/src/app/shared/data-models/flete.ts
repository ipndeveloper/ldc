import { EntityWithCode } from '../../core/models/entity-with-code';

export class Flete extends EntityWithCode {

  constructor(id: number, codigo: string, descripcion: string) {
    super(id, codigo, descripcion);
  }
}
