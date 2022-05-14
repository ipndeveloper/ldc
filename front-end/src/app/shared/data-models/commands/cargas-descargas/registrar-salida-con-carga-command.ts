import { ControlarSalidaCommand } from './controlar-salida-command';

export class RegistrarSalidaConCargaCommand extends ControlarSalidaCommand {
    id: number;
    numeroCTG: number | null;
    numeroTramiteCOT: number | null;
    numeroCOT: number | null;
    sinTarjeta: boolean | null;
    imprimeEnReimpresion?: boolean;
    idImpresora: number;
    observaciones: string;
    codigoCupo: string;
    nroPlantaAfip: number;
    codLocalidadAfip: number;
    codProvinciaAfip: number;
    nroDocumento: string;
    idCorredorVendedor: number | null;
    imprimeEnReimpresionCPE?: boolean | null;
    constructor(idMovimiento: number) {
        super();
        this.id = idMovimiento;
    }
}
