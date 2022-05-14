import { EntityWithCode } from '../../../../core/models/entity-with-code';

export class AmbienteCommand {
  public parametros: Array<EntityWithCode> = [];
  public terminales: Array<EntityWithCode> = [];
}

export class CrearAmbienteCommand extends AmbienteCommand {}
export class ModificarAmbienteCommand extends AmbienteCommand {}
export class AdministrarAmbienteDataView extends AmbienteCommand {}
