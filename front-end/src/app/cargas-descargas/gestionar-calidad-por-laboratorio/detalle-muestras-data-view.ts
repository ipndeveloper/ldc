export class DetalleMuestrasDataView {
    id: number;
    codigoMuestra: string;
    observacion: string;

    constructor(codigoMuestra: string, observacion: string) {
        this.codigoMuestra = codigoMuestra;
        this.observacion = observacion;
    }
}
