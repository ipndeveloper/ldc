import { ControlarSalidaCommand } from './controlar-salida-command';

export class RegistrarSalidaConDescargaCommand extends ControlarSalidaCommand {
    idMovimiento: number;

    constructor(idMovimiento: number) {
        super();
        this.idMovimiento = idMovimiento;
    }
}
