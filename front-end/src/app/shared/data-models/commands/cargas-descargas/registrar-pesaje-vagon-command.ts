import { RegistrarPesajeCommand } from './registrar-pesaje-command';

export class RegistrarPesajeVagonCommand extends RegistrarPesajeCommand {
    balanzaId: number;
    constructor (readonly id: number) {
        super(id);
    }
}
