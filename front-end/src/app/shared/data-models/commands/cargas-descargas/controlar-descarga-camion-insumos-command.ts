import { ControlarDescargaCamionInsumosVariosCommand } from './controlar-descarga-camion-insumos-varios-command';

export class ControlarDescargaCamionInsumosCommand extends ControlarDescargaCamionInsumosVariosCommand {
    idDestinatario: number;
    idFinalidad: number;
    idSedeVendedor: number;
    idSedeDestinatario: number;
    idProcedencia: number;
}
