export class EquivalenciaRubrosCommand  {
    id: number;
    idCamara: number;
    idProducto: number;
    idRubro: number;
    codigo: number;
    codigoTipo: string;
    habilitado: boolean;
}

export class CrearEquivalenciaRubrosCommand extends EquivalenciaRubrosCommand { }
export class ModificarEquivalenciaRubrosCommand extends EquivalenciaRubrosCommand { }
