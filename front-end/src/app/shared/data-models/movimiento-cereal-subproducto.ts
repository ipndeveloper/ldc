import { EstadoMovimiento } from './estado-movimiento';
import { Circuito } from './circuito/circuito';
import { MovimientoCereal } from './movimiento-cereal';

export class MovimientoCerealSubproducto extends MovimientoCereal {

    constructor(circuito: Circuito, estado: EstadoMovimiento) {
        super(circuito, estado);
    }
}
