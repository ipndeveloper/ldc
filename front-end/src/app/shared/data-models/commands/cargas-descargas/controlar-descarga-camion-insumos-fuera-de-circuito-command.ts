import { ControlarDescargaCamionInsumosCommand } from './controlar-descarga-camion-insumos-command';

export class ControlarDescargaCamionInsumosFueraDeCircuitoCommand extends ControlarDescargaCamionInsumosCommand {
    esFueraCircuito: boolean;
    fechaStockSan: string;
}
