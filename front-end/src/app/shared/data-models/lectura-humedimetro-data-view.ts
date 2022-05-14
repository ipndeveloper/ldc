import { EntityWithDescription } from '../../core/models/entity-with-description';
export class LecturaHumedimetroDataView {
    public id: number;
    public terminal: string;
    public producto?: string;
    public humedimetro: string;
    public estaHabilitado: boolean;
    public rubrosCalidad: EntityWithDescription[];
    public rubrosCalidadSeleccionados: EntityWithDescription[];
}
