import { Producto } from './producto';
import { Vendedor } from './vendedor';
import { CorredorComprador } from './corredor-comprador';
import { Destinatario } from './destinatario';
import { Sede } from './sede';
import { Finalidad } from './finalidad';
import { Cupo } from './cupo';
import { EstadoCupo } from './estado-cupo';
import { MotivoCupo } from './motivo-cupo';
import { EstadosCupo } from '../enums/enums';

export class CodigoCupo {
    public id: number;
    public codigoCupo: Cupo;
    public producto: Producto;
    public vendedor: Vendedor;
    public corredorComprador: CorredorComprador;
    public destinatario: Destinatario;
    public sedeOrigen: Sede;
    public finalidad: Finalidad;
    public motivo: MotivoCupo;
    public estado: EstadoCupo;
    public estadoInicial: EstadoCupo;
    public usuarioSAN: string;

    constructor() {
    }

    public esEstadoInicialSinCupo(): boolean {
        return this.estadoInicial.id === EstadosCupo.SinCupo;
    }

    public esEstadoPendienteCupo(): boolean {
        return this.estado.id === EstadosCupo.PendienteCupo;
    }

    public setearEstadoInicial(estadoCupo: EstadoCupo): void {
        this.estadoInicial = estadoCupo;
    }
}
