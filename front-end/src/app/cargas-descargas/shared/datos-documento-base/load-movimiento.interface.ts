import { Movimiento } from '../../../shared/data-models/movimiento';

export interface ILoadMovimiento<TMovimiento extends Movimiento> {
    loadMovimiento(movimiento: TMovimiento);
}
