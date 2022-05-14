export class TiempoLimiteEstadoCommand {
  id: number;
  idEstado: number;
  tiempoLimite: number;
}

export class CrearTiempoLimiteEstadoCommand extends TiempoLimiteEstadoCommand {}
export class ModificarTiempoLimiteEstadoCommand extends TiempoLimiteEstadoCommand {}
