import { EntityWithCode } from '../../core/models/entity-with-code';

export class MercadoTermino extends EntityWithCode {

    constructor(id: number, codigo: string, descripcion: string, readonly codigoActividad: number) {
        super(id, codigo, descripcion);
    }
}
