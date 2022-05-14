import { EstadoMovimiento } from './estado-movimiento';
import { Circuito } from './circuito/circuito';
import { Titular } from './titular';
import { Intermediario } from './intermediario';
import { CorredorComprador } from './corredor-comprador';
import { RemitenteComercial } from './remitente-comercial';
import { TipoPesada } from './tipo-pesada';
import { Entregador } from './entregador';
import { Finalidad } from './finalidad';
import { Localidad } from './localidad';
import { Sede } from './sede';
import { Chofer } from './chofer';
import { Movimiento } from './movimiento';
import { Silo } from './silo';
import { Cosecha } from './cosecha';
import { MotivoCupo } from './motivo-cupo';

export class MovimientoCereal extends Movimiento {
    public chofer: Chofer;
    public idCodigoCupo?: number;
    public codigoCupo: string;
    public estadoCupo: string;
    public corredorComprador: CorredorComprador;
    public entregador: Entregador;
    public fechaVencimiento: Date;
    public fechaCarga: Date;
    public fleteCargoLdc: boolean;
    public finalidad: Finalidad;
    public intermediario: Intermediario;
    public procedencia: Localidad;
    public remitenteComercial: RemitenteComercial;
    public sedeDestinatario: Sede;
    public sedeVendedor: Sede;
    public tipoPesada: TipoPesada;
    public titular: Titular;
    public turnoPlaya: string;
    public silo: Silo;
    public cosecha: Cosecha;
    public motivoCupo: MotivoCupo;
    public usuarioCupoSAN: string;
    public sinConfirmarCtg: boolean;

    constructor(circuito: Circuito, estado: EstadoMovimiento) {
        super(circuito, estado);
    }
}
