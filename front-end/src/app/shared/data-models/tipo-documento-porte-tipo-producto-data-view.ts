import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TipoDocumentoPorte } from '../../cargas-descargas/shared/data-models/tipo-documento-porte';
import { TipoProducto } from './tipo-producto';

export class TipoDocumentoPorteTipoProductoDataView {
    id: number;
    terminal: EntityWithDescription;
    tipoDocumentoPorte: TipoDocumentoPorte;
    tipoProducto: TipoProducto;
    habilitado: boolean;
}
