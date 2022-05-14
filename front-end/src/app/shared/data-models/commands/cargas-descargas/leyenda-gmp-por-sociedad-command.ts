
export class LeyendaGmpPorSociedadCommand {
    public id: number;
    public idTerminal: number;
    public idSociedad: number;
    public idProducto: number;
    public habilitado: boolean;
    public leyendaGmp: string;
}

export class CrearLeyendaGmpPorSociedadCommand extends LeyendaGmpPorSociedadCommand {}
export class ModificarLeyendaGmpPorSociedadCommand extends LeyendaGmpPorSociedadCommand {}
