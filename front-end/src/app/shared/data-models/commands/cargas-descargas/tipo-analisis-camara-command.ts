import { Terminal } from '../../terminal';

export class TipoAnalisisCamaraCommand  {
    public id: number;
    public terminal: Terminal;
    public tipoAnalisis: string;
    public esEspecial: boolean;
    public codigoCamara: number;
}

export class CrearTipoAnalisisCamaraCommand extends TipoAnalisisCamaraCommand { }
export class ModificarParametrosGrupoRubroCalidadAnalisisCommand extends TipoAnalisisCamaraCommand { }
