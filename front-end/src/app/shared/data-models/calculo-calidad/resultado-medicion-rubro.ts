import { MedicionDeRubro } from './medicion-rubro';
import { ServicioAcondicionamiento } from '../ingreso-calidad/ingreso-calidad';

export class ResultadoMedicionDeRubro extends MedicionDeRubro {

    porcentajeBonificacion: number;
    porcentajeRebajaConvenida: number | null;
    porcentajeMerma: number;
    porcentajeRebaja: number;
    servicioAcondicionamiento: ServicioAcondicionamiento;
    kgPesoMerma: number;
}
