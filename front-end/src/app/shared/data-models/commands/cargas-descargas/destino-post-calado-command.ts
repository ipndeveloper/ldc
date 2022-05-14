export class DestinoPostCaladoCommand  {
    id: number;
    idTerminal: number;
    destino: string;
    habilitado: boolean;
}

export class CrearDestinoPostCaladoCommand extends DestinoPostCaladoCommand { }
export class ModificarDestinoPostCaladoCommand extends DestinoPostCaladoCommand { }
