import { EstadoMovimiento } from './estado-movimiento';
import { Circuito } from './circuito/circuito';
import { TipoGrano } from './tipo-grano';
import { CorredorVendedor } from './corredor-vendedor';
import { IntermediarioFlete } from './intermediario-flete';
import { TipoCartaPorte } from './tipo-carta-porte';
import { CampoEpaSustentable } from './campo-epa-sustentable';
import { MovimientoCereal } from './movimiento-cereal';
import { TurnoCircularDataView } from './turno-circular-data-view';

export class MovimientoCerealGrano extends MovimientoCereal {
    public campoEpaSustentable: CampoEpaSustentable;
    public codigoCancelacionCTG: number | null;
    public corredorVendedor: CorredorVendedor;
    public codigoFiscalEstablecimiento: number | null;
    public intermediarioFlete: IntermediarioFlete;
    public kmRecorridos: number | null;
    public tarifaFleteReferencia: number;
    public tarifaFletePorTn: number;
    public tipoCartaPorte: TipoCartaPorte;
    public tipoGrano: TipoGrano;
    public confirmoCtg: boolean;
    public tieneCalidad: boolean;
    public turnoCircular: TurnoCircularDataView | null;
    public esFleteCorto: boolean;
    public confirmadoManualmente: boolean;

    constructor(circuito: Circuito, estado: EstadoMovimiento) {
        super(circuito, estado);
    }
}
