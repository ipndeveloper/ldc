import { Terminal } from './terminal';
import { TipoPuestoTrabajo } from './tipo-puesto-trabajo';
import { EntityWithDescription } from '../../core/models/entity-with-description';

export class PuestoTrabajoDataView {
    public id: number;
    public terminal: Terminal;
    public tipoPuestoTrabajo: TipoPuestoTrabajo;
    public nombre: string;
    public direccionIP: string;
    public habilitado: boolean;
    public utilizaTarjeta: boolean;
    public accionesPuestoTrabajo: AccionPuestoTrabajoDataView[];
    public dispositivosPuestoTrabajo: DispositivoPuestoTrabajoDataView[];
}

export class AccionPuestoTrabajoDataView {
    public id: number;
    public accion: EntityWithDescription;
    public automatico: boolean;
    public habilitado: boolean;
}

export class DispositivoPuestoTrabajoDataView {
    public id: number;
    public tipoDispositivo: EntityWithDescription;
    public dispositivo: EntityWithDescription;
    public habilitado: boolean;
}
