import { EstadoMovimiento } from './estado-movimiento';
import { Circuito } from './circuito/circuito';
import { Producto } from './producto';
import { TipoMovimiento } from './tipo-movimiento';
import { Destinatario } from './destinatario';
import { TipoProducto } from './tipo-producto';
import { TipoDocumentoPorte } from '../../cargas-descargas/shared/data-models/tipo-documento-porte';
import { Vendedor } from './vendedor';
import { Sociedad } from './sociedad';
import { Titular } from './titular';

export class Movimiento {
    public id: number;
    public circuito: Circuito;
    public destinatario: Destinatario;
    public estado: EstadoMovimiento;
    public kgBruto: number | null;
    public kgTara: number | null;
    public kgNeto: number | null;
    public nroDocumentoPorte: string;
    public nroTarjeta: number;
    public observaciones: string;
    public patenteCamion: string;
    public patenteAcoplado: string;
    public ferrocarril: string;
    public operativo: number;
    public producto: Producto;
    public vendedor: Vendedor;
    public tipoMovimiento: TipoMovimiento;
    public tipoProducto: TipoProducto;
    public tipoDocumentoPorte: TipoDocumentoPorte;

    public fechaEntrada: string;
    public fechaSalida: string;
    public fechaOperacion: string;
    public fechaStockSan: string;
    public idInterfazSan: string;

    public numeroVagon: number  | null;
    public numeroViaje: number  | null;
    public ordenCarga: number | null;
    public codigoEmisionElectronica: number | null;
    public codigoOperacionTraslado: number | null;
    public numeroTramiteOperacionTraslado: number | null;

    public tieneRecalado: boolean;

    public nroTicketPesaje: number | null;
    public version: string;
    public coeficiente: number | null;
    public netoDescargaLitros: number | null;

    public numeroTramiteCOT: number  | null;
    public numeroCOT: number  | null;
    public numeroCTG: number | null;
    public codigoTrazabilidadGrano: number | undefined;
    public titular: Titular | undefined;
    public transportista: Sociedad;
    public consultoAfip: boolean;
    public confirmoCtg: boolean;

    constructor(circuito: Circuito, estado: EstadoMovimiento) {
        this.circuito = circuito;
        this.estado = estado;
    }
}
