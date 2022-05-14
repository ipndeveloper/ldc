import { EntityWithCode } from '../../core/models/entity-with-code';

export class PeriodoEpa extends EntityWithCode {

    constructor(id: number, codigo: string, descripcion: string, readonly idTitular: number) {
      super(id, codigo, descripcion);
    }
}
