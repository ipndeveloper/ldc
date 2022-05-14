import { EntityWithCode } from '../../core/models/entity-with-code';

export class SuplenciaDataView {
    public id: number;
    public usuarioOrigen: EntityWithCode;
    public usuarioDestino: EntityWithCode;
    public fechaDesde: Date;
    public fechaHasta: Date;
    public estaHabilitado: boolean;
}
