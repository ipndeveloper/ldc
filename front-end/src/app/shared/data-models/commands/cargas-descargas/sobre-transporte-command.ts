export class SobreTransporteCommand  {
    id: number;
    nombre: string;
    idsUsuarios: number[];
}

export class CrearSobreTransporteCommand extends SobreTransporteCommand { }
export class ModificarSobreTransporteCommand extends SobreTransporteCommand { }
export class ImportarSobreTransporteCommand extends SobreTransporteCommand { }

