export class RangosCodigoBarraCamaraCommand  {
    id: number;
    idTerminal: number;
    fechaDesde: string;
    fechaHasta: string;
    codigoBarrasMinimo: number;
    codigoBarrasMaximo: number;
}

export class CrearRangosCodigoBarraCamaraCommand extends RangosCodigoBarraCamaraCommand { }
export class ModificarRangosCodigoBarraCamaraCommand extends RangosCodigoBarraCamaraCommand { }
