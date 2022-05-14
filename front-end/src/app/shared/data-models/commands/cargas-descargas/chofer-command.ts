export class ChoferCommand  {
    id: number;
    cuil: string;
    razonSocial: string;
    habilitado: boolean;
}

export class CrearChoferCommand extends ChoferCommand { }
export class ModificarChoferCommand extends ChoferCommand { }

