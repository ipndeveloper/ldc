import { Entity } from '../../core/models/entity';

export class ModalSeleccionarMovimientoDataView extends Entity {
    idMovimiento: number;
    documentoPorte: string;
    titular: string;
    producto: string;
}
