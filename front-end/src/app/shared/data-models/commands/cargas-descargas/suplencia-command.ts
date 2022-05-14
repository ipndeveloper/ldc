export class SuplenciaCommand  {
    id: number;
    idUsuarioOrigen: number;
    idUsuarioDestino: number;
    fechaDesde: Date;
    fechaHasta: Date;
    estaHabilitado: boolean;
}

export class CrearSuplenciaCommand extends SuplenciaCommand { }
export class ModificarSuplenciaCommand extends SuplenciaCommand { }
