export class CondicionManipuleoCommand  {
    public proteinaMinimo: number;
    public proteinaMaximo: number;
    public humedadMinimo: number;
    public humedadMaximo: number;
    public idGrado: number;
    public idPlataformaDescarga: number;
    public idPuntoCarga: number;

    constructor (public readonly idProducto: number,
                 public readonly idTipoMovimiento: number,
                 public readonly idTipoTransporte: number,
                 public readonly idSilo: number,
                 public readonly estaHabilitado: boolean) {
    }
}

export class CrearCondicionManipuleoCommand extends CondicionManipuleoCommand {}
export class ModificarCondicionManipuleoCommand extends CondicionManipuleoCommand {}
