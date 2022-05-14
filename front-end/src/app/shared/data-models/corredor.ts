import { EntityWithHints } from '../../core/models/entity-with-hints';

export class Corredor extends EntityWithHints {
  mensajeErrorOncca: string;

    constructor(id: number,
                codigo: string,
                descripcion: string,
                sugerencias: string,
                readonly codigoActividad: number) {
        super(id, codigo, sugerencias, descripcion);
    }
}
