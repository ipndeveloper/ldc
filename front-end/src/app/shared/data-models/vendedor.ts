import { EntityWithCode } from '../../core/models/entity-with-code';

export class Vendedor extends EntityWithCode {
    codigoOperadorOncca: string;
    mensajeErrorOncca: string;

    constructor(id: number, codigoFiscal: string, descripcion: string, readonly codigoActividad: number) {
        super(id, codigoFiscal, descripcion);
    }
}
