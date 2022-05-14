import { EntityWithDescription } from '../../core/models/entity-with-description';

export class AdministrarRangosCodigoBarraCamaraDataView {
    id: number;
    terminal: EntityWithDescription;
    fechaDesde: Date;
    fechaHasta: Date;
    codigoBarrasMinimo: number;
    codigoBarrasMaximo: number;
}
