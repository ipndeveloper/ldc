import { ServicioAcondicionamiento } from './ingreso-calidad';

export class RubroCalidadMovimientoCereal {
    id: number;
    descripcion: string;
    porcentajeBonificacion: number;
    porcentajeRebajaConvenida: number;
    porcentajeMerma: number;
    valorMedido: number;
    servicioAcondicionamiento: ServicioAcondicionamiento | null;
    esRequerido: boolean;
    determinaGrado: boolean;
    requiereAnalisis: boolean;
    porcentajeRebaja: number;
    idRubroCalidad: number;
    lecturaAutomatica: boolean;
    lecturaAutomaticaDescripcion: string;
    valorMinimo: number | null;
    valorMaximo: number | null;
    kgPesoMerma: number;
}
