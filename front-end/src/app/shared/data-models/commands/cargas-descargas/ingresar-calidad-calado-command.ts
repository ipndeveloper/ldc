import { RubroCalidadMovimientoCereal } from '../../ingreso-calidad/rubro-calidad-movimiento-cereal';
import { MuestraLaboratorioCalidadMovimientoCereal } from '../../ingreso-calidad/muestra-laboratorio-calidad-movimiento.cereal';

export class IngresarCalidadCaladoCommand {
    idMovimiento: number;
    rubrosCalidad: RubroCalidadMovimientoCereal[];
    muestrasLaboratorio: MuestraLaboratorioCalidadMovimientoCereal[];
    factor: number;
    idGrado: number | null;
    observacionLDC: string;
    observacionEntregador: string;
    IdReferenciaDestino: number;
    IdAccion: number;
    idActividad: number;
    idGrupoRubroAnalisis: number;
    requiereAnalisisPorTecnologia: boolean;
    requiereAnalisisCamara: boolean;
    codigoBarras: number;

    constructor(idMovimiento: number, rubrosCalidad: RubroCalidadMovimientoCereal[], factor: number, idGrado: number,
    idReferenciaDestino, idAccion) {
        this.idMovimiento = idMovimiento;
        this.rubrosCalidad = rubrosCalidad;
        this.factor = factor;
        this.idGrado = idGrado;
        this.IdReferenciaDestino = idReferenciaDestino;
        this.IdAccion = idAccion;
    }
}
