import { RegistrarPesajeCommand } from './registrar-pesaje-command';
import { MotivoNoDescarga } from '../../../../cargas-descargas/registrar-peso/situacion-entrada/lista-motivos-no-descarga/motivo-no-descarga';

export class RegistrarPesajeCamionCommand extends RegistrarPesajeCommand {
    esDescarga: boolean;
    motivosNoDescargaCarga: MotivoNoDescarga[];
    fueExitoso: number;

    constructor (readonly id: number) {
        super(id);
        this.motivosNoDescargaCarga = new Array<MotivoNoDescarga>();
    }
}
