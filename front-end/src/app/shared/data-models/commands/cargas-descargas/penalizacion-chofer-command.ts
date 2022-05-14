export class PenalizacionChoferCommand {

    public IdChofer: number;
    public IdResponsablePenalizacion: number;
    public MotivoSancion: string;
    public FechaDesde: string;
    public FechaHasta: string;
    public Habilitado: boolean;
    public IdResponsableLevantamiento?: number;
}

export class CrearPenalizacionChoferCommand extends PenalizacionChoferCommand {}
export class ModificarPenalizacionChoferCommand extends PenalizacionChoferCommand {}
