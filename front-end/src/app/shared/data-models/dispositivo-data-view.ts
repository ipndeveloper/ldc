import { Terminal } from './terminal';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TipoDispositivo } from './tipo-dispositivo';

export class DispositivoDataView {
    id: number;
    nombre: string;
    numeroSerie: string;
    idTipoDispositivo: number;
    tipoDispositivo: TipoDispositivo;
    terminal: Terminal;
    pathArchestra: string;
    sentidoBalanza: EntityWithDescription;
    estaActivo: boolean;
    sinBalancero: boolean;
}
