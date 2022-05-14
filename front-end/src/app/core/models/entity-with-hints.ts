import { EntityWithCode } from './entity-with-code';

export class EntityWithHints extends EntityWithCode {
  constructor(readonly id: number,
              readonly codigo: string,
              readonly descripcion: string,
              readonly sugerencias: string) {
    super(id, codigo, descripcion);
  }
}
