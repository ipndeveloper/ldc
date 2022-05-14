export class ImpresoraCommand  {
    id: number;
    nombre: string;
    uncPath: string;
    habilitado: boolean;
    idsTipoReporte: number[];
}

export class CrearImpresoraCommand extends ImpresoraCommand { }
export class ModificarImpresoraCommand extends ImpresoraCommand { }

