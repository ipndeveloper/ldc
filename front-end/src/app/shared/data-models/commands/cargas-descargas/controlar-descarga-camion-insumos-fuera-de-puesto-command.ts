import { ControlarDescargaCamionInsumosCommand } from './controlar-descarga-camion-insumos-command';

export class ControlarDescargaCamionInsumosFueraDePuestoCommand extends ControlarDescargaCamionInsumosCommand {
    esFueraCircuito: boolean;
}
