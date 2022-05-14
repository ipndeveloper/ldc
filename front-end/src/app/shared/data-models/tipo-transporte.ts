import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TiposTransporte } from '../enums/enums';

export class TipoTransporte extends EntityWithDescription {
    constructor(id: number, descripcion?: string) {
      super(id, descripcion);
    }
}

export const tiposTransportes: TipoTransporte[] = [
    { id: TiposTransporte.Camion, descripcion: 'Camión' },
    { id: TiposTransporte.Tren, descripcion: 'Tren' }
];

export class EntitiesTiposTransporte {
    static Camion = tiposTransportes[0];
    static Tren = tiposTransportes[1];
}
