export class UsuarioCommand  {
    id: number;
    nombreAD: string;
    nombre: string;
    apellido: string;
    mail: string;
    habilitado: boolean;
    rolesTerminal: RolTerminalCommand[];
    impresoras: ImpresoraCommand[];
}

export class RolTerminalCommand {
    id: number;
    idTerminal: number;
    idRol: number;
    habilitado: boolean;
}

export class ImpresoraCommand {
    id: number;
    idImpresora: number;
    habilitado: boolean;
}

export class CrearUsuarioCommand extends UsuarioCommand { }
export class ModificarUsuarioCommand extends UsuarioCommand { }
