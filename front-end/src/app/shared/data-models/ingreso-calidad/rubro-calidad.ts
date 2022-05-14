import { ServicioAcondicionamiento } from './ingreso-calidad';

export class RubroCalidadMovimientoCereal {
    id: number;
    descripcion: string;
    porcentajeBonificacion: number;
    porcentajeDescuento: number;
    porcentajeMerma: number;
    valorMedido: number;
    servicioAcondicionamiento: ServicioAcondicionamiento | null;
    esRequerido: boolean;
    determinaGrado: boolean;
    kgPesoMerma: number;
  }
