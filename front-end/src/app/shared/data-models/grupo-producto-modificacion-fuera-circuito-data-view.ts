import { EntityWithDescription } from '../../core/models/entity-with-description';
export class GrupoProductoModificacionFueraCircuitoDataView {
    public id: number;
    public descripcion: string;
    public tipoProducto: EntityWithDescription;
    public habilitado: boolean;
    public productos: EntityWithDescription[];
}
