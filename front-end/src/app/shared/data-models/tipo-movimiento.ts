import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TiposMovimiento } from '../enums/enums';

export class TipoMovimiento extends EntityWithDescription {
    constructor(id: number, descripcion: string) {
      super(id, descripcion);
    }
}

export const tiposMovimientos: TipoMovimiento[] = [
    { id: TiposMovimiento.Carga, descripcion: 'Carga' },
    { id: TiposMovimiento.Descarga, descripcion: 'Descarga' }
];

export class EntitiesTiposMovimiento {
    static Carga = tiposMovimientos[0];
    static Descarga = tiposMovimientos[1];
}
