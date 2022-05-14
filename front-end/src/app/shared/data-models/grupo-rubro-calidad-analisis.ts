import { EntityWithDescription } from '../../core/models/entity-with-description';
import { RubroCalidadMovimientoCereal } from './ingreso-calidad/rubro-calidad-movimiento-cereal';

export class GrupoRubroCalidadAnalisis extends EntityWithDescription {

  esEspecial: boolean;
  rubrosCalidad: RubroCalidadMovimientoCereal[];
    constructor(id: number, descripcion?: string) {
      super(id, descripcion);
    }
  }
