
export class RolCommand  {
    id: number;
    descripcion: number;
    habilitado: boolean;
    permisos: number[];
}

export class CrearRolCommand extends RolCommand { }
export class ModificarRolCommand extends RolCommand { }
