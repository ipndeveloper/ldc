import { Terminal } from './terminal';
import { TipoMovimiento } from './tipo-movimiento';
import { TipoProducto } from './tipo-producto';
import { TipoTransporte } from './tipo-transporte';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { MotivoErrorBalanzaCircuitoDataView } from './motivo-error-balanza-circuito-data-view';

export class CircuitoDataView {
    public id: number;
    public terminal: Terminal;
    public nombre: string;
    public tipoMovimiento: TipoMovimiento;
    public tipoProducto: TipoProducto;
    public tipoTransporte: TipoTransporte;
    public habilitado: boolean;
    public finalidades: EntityWithDescription[];
    public motivosErrorBalanzaEntrada: MotivoErrorBalanzaCircuitoDataView[];
    public motivosErrorBalanzaSalida: MotivoErrorBalanzaCircuitoDataView[];
}
