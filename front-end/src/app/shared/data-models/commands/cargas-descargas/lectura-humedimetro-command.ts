export class LecturaHumedimetroCommand {
  id: number;
  idTerminal: number;
  idProducto: number;
  idTipoDispositivo: number;
  habilitado: boolean;
  idRubrosCalidad: number[];
}

export class CrearLecturaHumedimetroCommand extends LecturaHumedimetroCommand { }
export class ModificarLecturaHumedimetroCommand extends LecturaHumedimetroCommand { }
