export class PuntoCargaCommand {
    public idTerminal: number;
    public descripcion: string;
    public habilitado: boolean;
    public capacidadMaxima: number;
}

export class CrearPuntoCargaCommand extends PuntoCargaCommand {}
export class ModificarPuntoCargaCommand extends PuntoCargaCommand {}
