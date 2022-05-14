
export class RegistrarPesajeFueraDeCircuitoCommand {
    fechaStockSan: string;
    bruto: number;
    tara: number;
    version: string;
    coeficienteConversionLitros?: number;

    constructor (readonly id: number) {
    }
}
