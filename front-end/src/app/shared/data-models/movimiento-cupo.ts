import { Circuito } from './circuito/circuito';
import { Destinatario } from './destinatario';
import { EstadoMovimiento } from './estado-movimiento';
import { Producto } from './producto';
import { Titular } from './titular';
import { TipoMovimiento } from './tipo-movimiento';
import { TipoProducto } from './tipo-producto';
import { TipoDocumentoPorte } from '../../cargas-descargas/shared/data-models/tipo-documento-porte';
import { Transportista } from './transportista';
import { Chofer } from './chofer';
import { Corredor } from './corredor';
import { Vendedor } from './vendedor';
import { Sede } from './sede';
import { Finalidad } from './finalidad';
import { Localidad } from './localidad';
import { CampoEpaSustentable } from './campo-epa-sustentable';
import { Cosecha } from './cosecha';
import { MotivoCupo } from './motivo-cupo';
import { CodigoCupo } from './codigo-cupo';
import { TurnoCircularDataView } from './turno-circular-data-view';
import { EntityWithCode } from '../../core/models/entity-with-code';

export class MovimientoCupo {
    public id: number;
    public circuito: Circuito;
    public cupo: CodigoCupo;
    public idCodigoCupo: number;
    public codigoCupo: string;
    public destinatario: Destinatario;
    public vendedor: Vendedor;
    public corredorComprador: Corredor;
    public sedeVendedor: Sede;
    public finalidad: Finalidad;
    public motivoCupo: MotivoCupo;
    public estado: EstadoMovimiento;
    public estadoInicial: EstadoMovimiento;
    public kgNeto: number | null;
    public nroDocumentoPorte: string;
    public producto: Producto;
    public titular: Titular;
    public tipoMovimiento: TipoMovimiento;
    public tipoProducto: TipoProducto;
    public tipoDocumentoPorte: TipoDocumentoPorte;
    public procedencia: Localidad;
    public campoEpaSustentable: CampoEpaSustentable;
    public ctg: number | null;
    public codigoCancelacionCtg: number | null;
    public cosecha: Cosecha;
    public pasoCalado: boolean;
    public confirmoCtg: boolean;
    public kgsNeto: number | null;
    public fechaVigente: string;
    public fechaAnterior: string;
    public fechaSiguiente: string;
    public cuposOtorgadosFechaVigente: string;
    public cuposIngresadosFechaVigente: string;
    public cuposSaldoFechaVigente: string;
    public cuposOtorgadosFechaAnterior: string;
    public cuposIngresadosFechaAnterior: string;
    public cuposSaldoFechaAnterior: string;
    public cuposOtorgadosFechaSiguiente: string;
    public cuposIngresadosFechaSiguiente: string;
    public cuposSaldoFechaSiguiente: string;
    public sinConfirmarCtg: boolean;
    public confirmadoManualmente: boolean;
    public usuarioCupoSAN: string;
    public numeroCTG: number | null;
    public transportista: Transportista;
    public chofer: Chofer;
    public turnoCircular: TurnoCircularDataView | null;
    public consultoAfip = false;
    public cartaSustentable: EntityWithCode;
    constructor(circuito: Circuito, estado: EstadoMovimiento) {
        this.circuito = circuito;
        this.estado = estado;
    }
}