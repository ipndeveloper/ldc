
export class ProductoHabilitadoPorTerminalCommand {
    public idProducto: number;
    public idTerminal: number;
    public habilitado: boolean;
    public IdGrupoAnalisisDefecto: number;
    public silos: number[];
    public grados: number[];
    public rubrosCalidad: RubroCalidadPorTerminalCommand[];
    public idCosechaPorDefecto: number;
    public leyendaNormaCalidad: string;
    public imprimeOblea: boolean;
    public cantidadCopiasOblea: number | null;
    public gestionaCot: boolean;
    public usaSustentabilidad: boolean;
}

export class CrearProductoHabilitadoPorTerminalCommand extends ProductoHabilitadoPorTerminalCommand {}
export class ModificarProductoHabilitadoPorTerminalCommand extends ProductoHabilitadoPorTerminalCommand {}

export class RubroCalidadPorTerminalCommand {
    public id: number;
    public orden: number;
    public Maximo: number;
    public Minimo: number;
}
