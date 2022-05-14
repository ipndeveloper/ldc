import { EntityWithHints } from '../../core/models/entity-with-hints';

export class Chofer extends EntityWithHints {
  habilitado: boolean;
  penalizado: boolean;
  estaHabilitado: boolean;

  constructor(id: number,
              codigo: string,
              descripcion: string,
              sugerencias: string) {
    super(id, codigo, descripcion, sugerencias);
  }
}
