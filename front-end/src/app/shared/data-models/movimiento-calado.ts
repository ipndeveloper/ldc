import { IngresoCalidad } from './ingreso-calidad/ingreso-calidad';
import { EstadoMovimiento } from './estado-movimiento';
import { Producto } from './producto';
import { CondicionMermaEspecialDataView } from './ingreso-calidad/condicion-merma-especial-data-view';

export class MovimientoCalado {
    id: number;
    estado: EstadoMovimiento;
    producto: Producto;
    ingresoCalidad: IngresoCalidad;
    idCircuito: number;
    idTerminal: number;
    idTipoTransporte: number;
    idTipoProducto: number;
    idTipoMovimiento: number;
    nroTarjeta: number;
    esRecalado: boolean;
    patenteCamion: string;
    numeroVagon: string;
    tipoDocumentoPorteDescripcion: string;
    turno: string;
    estadoCupo: string;
    numeroDocumentoPorte: string;
    entregadorRazonSocial: string;
    titularRazonSocial: string;
    destinatarioRazonSocial: string;
    sede: string;
    corredor: string;
    vendedor: string;
    fechaStockSan: Date;
    tieneMasDeUnaCalidad: boolean;
    idFinalidad: number;
    idCorredor: number;
    idVendedor: number;
    kgPesoNeto: number;
    version: string;
    tieneNotificacionMermasEspecialesParametrizadas: boolean;
    imprimeObleaLaboratorio: boolean;
    condicionMermasEspeciales: CondicionMermaEspecialDataView[];
    ctg: number;
}
