import { EntityWithDescription } from '../../core/models/entity-with-description';

export class DestinoPostCaladoDataView {
    id: number;
    terminal: EntityWithDescription;
    destino: string;
    habilitado: boolean;
}
