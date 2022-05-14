import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TiposProducto } from '../enums/enums';

export class TipoProducto extends EntityWithDescription {
  constructor(id: number, descripcion: string) {
    super(id, descripcion);
  }
}

// Se utilizan para determinar navegacion en GestionControl
export const tiposProducto: TipoProducto[] = [
  { id: TiposProducto.Cereal, descripcion: 'Cereal' },
  { id: TiposProducto.Insumos, descripcion: 'Insumos' },
  { id: TiposProducto.SubProductos, descripcion: 'Sub-productos' },
  { id: TiposProducto.Varios , descripcion: 'Varios' },
  { id: TiposProducto.NoGranos, descripcion: 'No-Granos' },
  { id: TiposProducto.InsumosLiquidos, descripcion: 'Insumos (Hexano)' },
  { id: TiposProducto.Chatarra, descripcion : 'Chatarra'},
  { id: TiposProducto.Decomiso, descripcion : 'Decomiso'}
];

export class EntitiesTiposProducto {
  static Cereal = tiposProducto[0];
  static Insumos = tiposProducto[1];
  static SubProductos = tiposProducto[2];
  static Varios = tiposProducto[3];
  static NoGranos = tiposProducto[4];
  static InsumosLiquidos = { id: TiposProducto.InsumosLiquidos, descripcion: 'Insumos (Hexano)' };
}
