import { EntityWithDescription } from '../../core/models/entity-with-description';
import { DispositivoDataView } from './dispositivo-data-view';

export class DispositivoCaladoDataView {
    esAutomatico: boolean;
    dispositivo: DispositivoDataView;
    rubrosCalidad: EntityWithDescription[];
}
