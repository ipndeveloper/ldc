import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ModalSeleccionarRemitoDataView extends EntityWithDescription {
    idMovimiento: number;
    documentoPorte: string;
    vendedor: string;
    producto: string;
    patenteCamion?: string;
}
