import { EntityWithDescription } from '../../core/models/entity-with-description';

export class UsuarioDataView {
    public id: number;
    public nombreAD: string;
    public nombre: string;
    public apellido: string;
    public mail: string;
    public habilitado: boolean;
    public rolesTerminal: RolTerminalDataView[];
    public impresoras: ImpresoraUsuarioDataView[];
}

export class RolTerminalDataView {
    public id: number;
    public terminal: EntityWithDescription;
    public rol: EntityWithDescription;
    public habilitado: boolean;
}

export class ImpresoraUsuarioDataView {
    public id: number;
    public impresora: EntityWithDescription;
    public habilitado: boolean;
}

export class UsuarioADDataView {
    public nombre: string;
    public apellido: string;
    public mail: string;
}
