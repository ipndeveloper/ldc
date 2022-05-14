export class PlataformaDescargaCommand {
    public idTerminal: number;
    public descripcion: string;
    public habilitado: boolean;
    public capacidadMaxima: number;
}

export class CrearPlataformaDescargaCommand extends PlataformaDescargaCommand {}
export class ModificarPlataformaDescargaCommand extends PlataformaDescargaCommand {}
