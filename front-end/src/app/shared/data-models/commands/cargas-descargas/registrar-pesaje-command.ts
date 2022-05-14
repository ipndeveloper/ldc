import { Entity } from '../../../../core/models/entity';
import { PesoRegistrado } from '../../../../cargas-descargas/registrar-peso/peso-registrado';
import { Autorizacion } from '../../../../cargas-descargas/shared/autorizacion/autorizacion';

export class RegistrarPesajeCommand extends Entity {
    pesadas: PesoRegistrado[];
    esEntrada: boolean;
    IdCondicionManipuleo: number;
    autorizaciones: Autorizacion[];
    esAutomatico: boolean;
    version: string;
    constructor (readonly id: number) {
        super(id);
        this.pesadas = new Array<PesoRegistrado>();
    }
}
