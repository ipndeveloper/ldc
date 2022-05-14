import { EntityWithDescription } from '../../core/models/entity-with-description';

export class ReimprimirDocumentoPorteDataView {
    public id: number;
    public idTipoMovimiento: number;
    public idEstadoMovimiento: number;
    public producto: string;
    public tipoDocumentoPorte: string;
    public NumeroDocPorte: string;
    public patenteCamion: string;
    public patenteAcoplado: string;
    public ordenCarga: string;
    public numeroViaje: string;
    public corredorComprador: string;
    public remitenteComercial: string;
    public impresoraDefectoUsuario: EntityWithDescription;
    constructor() {}
}
