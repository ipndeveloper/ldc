export class TarjetaAutorizacionCommand {
  id: number;
  idTerminal: number;
  idUsuario: number;
  numero: number;
  habilitada: boolean;
}

export class CrearTarjetaAutorizacionCommand extends TarjetaAutorizacionCommand {}
export class ModificarTarjetaAutorizacionCommand extends TarjetaAutorizacionCommand {}
