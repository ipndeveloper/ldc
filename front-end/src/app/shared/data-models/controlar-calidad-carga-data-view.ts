import { EntityWithCode } from '../../core/models/entity-with-code';

export class ControlarCalidadCargaDataView {
    public id: number;
    public tipoDocumentoPorte: string;
    public numeroDocumentoPorte: string;
    public producto: EntityWithCode;
    public estado: string;
    public ordenCarga: string;
    public nroViaje: string;
    public titularCP: string;
    public vendedor: string;
    public patente: string;
    public coeficiente?: number;
    public esCoeficienteVariable: boolean;
    public fechaEntrada: string;
    public tarjeta: string;
}
