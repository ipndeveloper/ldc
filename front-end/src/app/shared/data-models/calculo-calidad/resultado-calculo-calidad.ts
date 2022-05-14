
import { ResultadoMedicionDeRubro } from './resultado-medicion-rubro';
import { Grado } from '../grado';

export class ResultadoCalculoCalidad {

    constructor() {
        this.resultadosRubrosCalidad = new Array<ResultadoMedicionDeRubro>();
        this.alertas = new Array<string>();
    }

    grado: Grado;
    factor: number;
    resultadosRubrosCalidad: ResultadoMedicionDeRubro[];
    alertas: string[];
}
