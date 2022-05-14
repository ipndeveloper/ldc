import { MedicionDeRubro } from './medicion-rubro';

export class CalculoCalidad {

    idProducto: number;
    idFinalidad: number;
    idTipoMovimiento: number;
    idCorredor: number;
    idVendedor: number;
    kgPesoNetoBalanza: number;
    medicionesRubrosCalidad: MedicionDeRubro[];
}
