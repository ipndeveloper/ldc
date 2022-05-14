import { EntityWithCode } from '../../core/models/entity-with-code';

// export class AmbienteDataView {
//     public tipoAmbiente: string;
//     public ubicacionFisica: string;
//     public terminales: Array<EntityWithDescription>;
//     public esAmbienteRemoto: boolean;
//     public esAmbienteDeConfiguracion: boolean;
//     public conexionSobresTransporte: string;
//     public conexionSAN: string;
// }

export class AmbienteDataView {
    public parametros: Array<EntityWithCode>;
    public terminales: Array<EntityWithCode>;
}
