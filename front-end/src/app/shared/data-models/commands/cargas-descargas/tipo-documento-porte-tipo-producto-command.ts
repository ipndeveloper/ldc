export class TipoDocumentoPorteTipoProductoCommand  {
    id: number;
    idTerminal: number;
    idTipoDocumentoPorte: number;
    idTipoProducto: number;
    habilitado: boolean;
}

export class CrearTipoDocumentoPorteTipoProductoCommand extends TipoDocumentoPorteTipoProductoCommand { }
export class ModificarTipoDocumentoPorteTipoProductoCommand extends TipoDocumentoPorteTipoProductoCommand { }
