export class TarjetaCommand {
  id: number;
  idTerminal: number;
  prefijo: string;
  numero: number;
  sufijo: string;
  numeroHasta: number | null;
  habilitada: boolean;
  esAltaMasiva: boolean;
  idsTarjetas: number[];
}

export class CrearTarjetaCommand extends TarjetaCommand {}
export class ModificarTarjetaCommand extends TarjetaCommand {
  constructor (public readonly idsTarjetas: number[] = []) {
    super();
  }
}
