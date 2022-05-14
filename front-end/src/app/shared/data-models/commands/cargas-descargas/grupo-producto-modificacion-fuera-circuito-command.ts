export class GrupoProductoModificacionFueraCircuitoCommand {
  id: number;
  descripcion: string;
  idTipoProducto: number;
  habilitado: boolean;
  idProductos: number[];
}

export class CrearGrupoProductoModificacionFueraCircuitoCommand extends GrupoProductoModificacionFueraCircuitoCommand {}
export class ModificarGrupoProductoModificacionFueraCircuitoCommand extends GrupoProductoModificacionFueraCircuitoCommand {}
