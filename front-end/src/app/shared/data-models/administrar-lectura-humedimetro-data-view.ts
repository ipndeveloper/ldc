import { EntityWithDescription } from '../../core/models/entity-with-description';

export class AdministrarLecturaHumedimetroDataView {
    public id: number;
    public terminal: string;
    public producto: EntityWithDescription;
    public tipoDispositivo: EntityWithDescription;
    public estaHabilitado: boolean;
    public habilitado: string;
}
