import { EstadoCupo } from './estado-cupo';

export class EstadoVigenciaCupoDataView {
    public estadoCodigoCupo: EstadoCupo;
    public otorgados: number;
    public ingresados: number;
    public saldo: number;
    public fecha: Date;
    public fechaFormat: String;

    constructor() {
    }
}
