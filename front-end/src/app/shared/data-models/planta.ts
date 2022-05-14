import { EntityWithCode } from '../../core/models/entity-with-code';

export class Planta extends EntityWithCode {

    codProvincia: number;
    codLocalidad: number;
    nroPlanta: number;
    localidad: string;
    provincia: string;
    descripcion: string;

    constructor(id: number,
                codigo: string,
                descripcion: string) {
        super(id, codigo, descripcion);
    }
}
