import { RubroCalidadMovimientoCereal } from '../../ingreso-calidad/rubro-calidad-movimiento-cereal';
import { MuestraLaboratorioCalidadMovimientoCereal } from '../../ingreso-calidad/muestra-laboratorio-calidad-movimiento.cereal';
import { CondicionMermaEspecialCommand } from '../../ingreso-calidad/condicion-merma-especial-command';

export class IngresarCalidadCommand {
    id: number;
    rubrosCalidad: RubroCalidadMovimientoCereal[];
    muestrasLaboratorio: MuestraLaboratorioCalidadMovimientoCereal[];
    condicionMermasEspeciales: CondicionMermaEspecialCommand[];
    factor: number;
    idGrado: number | null;
    observacionLDC: string;
    observacionEntregador: string;
    IdReferenciaDestino: number;
    idGrupoRubroAnalisis: number;
    idLaboratorio: number;
    requiereAnalisisPorTecnologia: boolean;
    requiereAnalisisCamara: boolean;
    codigoBarras: string;
    esModificacion: boolean;
    fechaStockSan: string;
    version: string;
    esRegistroDecisionEntregador: boolean;
    imprimeEnReimpresion?: boolean;
    idImpresora?: number;

    constructor(id: number,
                rubrosCalidad: RubroCalidadMovimientoCereal[],
                factor: number,
                idGrado: number,
                idReferenciaDestino: number) {
        this.id = id;
        this.rubrosCalidad = rubrosCalidad;
        this.factor = factor;
        this.idGrado = idGrado;
        this.IdReferenciaDestino = idReferenciaDestino;
    }
}
