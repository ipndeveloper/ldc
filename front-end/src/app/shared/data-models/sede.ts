import { EntityWithCode } from '../../core/models/entity-with-code';

export class Sede extends EntityWithCode {

  esAcopio: boolean;
  constructor(id: number, codigo: string, descripcion: string, esAcopio = false) {
    super(id, codigo, descripcion);
    this.esAcopio = esAcopio;
  }
}
