import { Cosecha } from './cosecha';
import { Titular } from './titular';
import { Vendedor } from './vendedor';
import { Intermediario } from './intermediario';
import { CorredorComprador } from './corredor-comprador';
import { RemitenteComercial } from './remitente-comercial';
import { Destinatario } from './destinatario';
import { Finalidad } from './finalidad';
import { Sede } from './sede';
import { Localidad } from './localidad';
import { Chofer } from './chofer';
import { Entregador } from './entregador';
import { CorredorVendedor } from './corredor-vendedor';
import { TipoPesada } from './tipo-pesada';
import { TipoMovimiento } from './tipo-movimiento';
import { TipoTransporte } from './tipo-transporte';
import { TipoProducto } from './tipo-producto';
import { Movimiento } from './movimiento';
import { TipoCartaPorte } from './tipo-carta-porte';
import { Sociedad } from './sociedad';
import { EntityWithDescription } from '../../core/models/entity-with-description';
import { TipoGrano } from './tipo-grano';

export class MovimientoCarga extends Movimiento {
    public id: number;
    public observaciones: string;
    public ordenCarga: number | null;
    public estadoViaje: string;
    public estadoCabecera: string;
    public numeroCEE: number;
    public numeroContrato: number;
    public intermediario: Intermediario;
    public remitenteComercial: RemitenteComercial;
    public corredorComprador: CorredorComprador;
    public cantidadEstimada: number;
    public finalidad: Finalidad;
    public sedeDestinatario: Sede;
    public sedeVendedor: Sede;
    public chofer: Chofer;
    public calle: string;
    public numero: string;
    public localidad: string;
    public codigoPostal: string;
    public provincia: string;
    public usuarioAltaCarga: string;
    public corredorVendedor: CorredorVendedor;
    public numeroTarjeta: number;
    public tipoMovimiento: TipoMovimiento;
    public tipoTransporte: TipoTransporte;
    public tipoProducto: TipoProducto;
    public establecimientoDestino: Sociedad;
    public tarifaFleteReferencia: number;
    public tarifaFletePorTn: number;
    public nroTicketPesaje: number;
    public lugarCarga: string;
    public condicionManipuleo: EntityWithDescription;
    public productoHabilitadoTerminal?: boolean;
    public contraparte: EntityWithDescription;
    public identificacionDestinacion: string;
    public esVentaInterco: boolean;
}

export class MovimientoCargaCamionVarios extends MovimientoCarga {}

export class MovimientoCargaCamion extends MovimientoCarga {
    public cosecha: Cosecha;
    public titular: Titular;
    public vendedor: Vendedor;
    public entregador: Entregador;
    public destinatario: Destinatario;
    public establecimiento: string;
    public procedencia: Localidad;
    public destino: string;
    public kilometrosRecorridos?: number;
    public fechaVencimiento: string;
    public tipoCartaPorte: TipoCartaPorte;
    public tipoPesada: TipoPesada;
    public codigoTrazabilidadGrano: number;
    public tipoGrano: TipoGrano;
    public codigoCupo: string;
}
