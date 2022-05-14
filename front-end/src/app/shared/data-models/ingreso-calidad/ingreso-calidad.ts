import { ReferenciaDestino } from '../referencia-destino';
import { GrupoRubroCalidadAnalisis } from '../grupo-rubro-calidad-analisis';
import { MuestraLaboratorioCalidadMovimientoCereal } from './muestra-laboratorio-calidad-movimiento.cereal';
import { ValoresCalidad } from './valores-calidad';
import { DecisionLaboratorio } from '../../../cargas-descargas/gestionar-calidad-por-laboratorio/decision-laboratorio';
import { CondicionMermaEspecialDataView } from './condicion-merma-especial-data-view';
import { EntityWithDescription } from '../../../core/models/entity-with-description';

export class ServicioAcondicionamiento {
  descripcion: string;
}

export class AccionCalado {
  id: number;
  descripcion: string;
}

export class Laboratorio extends EntityWithDescription {}

export class IngresoCalidad extends ValoresCalidad {
  muestrasLaboratorio: MuestraLaboratorioCalidadMovimientoCereal[];
  referenciaDestino: ReferenciaDestino;
  decisionLaboratorio: DecisionLaboratorio;
  observacionLDC: string;
  observacionEntregador: string;
  observacionesLaboratorio: string;
  requiereAnalisisPorTecnologia: boolean;
  requiereAnalisisCamara: boolean;
  grupoRubroCalidadAnalisis: GrupoRubroCalidadAnalisis;
  codigoBarras: string;
  fechaEnvioACamara: Date | null;
  condicionMermasEspeciales: CondicionMermaEspecialDataView[];
  laboratorio: Laboratorio;
}
