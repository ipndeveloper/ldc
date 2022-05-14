import { EntityWithCode } from '../../core/models/entity-with-code';

export class Titular extends EntityWithCode {
    codigoOperadorOncca: string;
    mensajeErrorOncca: string;

    constructor(id: number, codigo: string, descripcion: string, readonly codigoActividad: number) {
        super(id, codigo, descripcion);
    }
}
