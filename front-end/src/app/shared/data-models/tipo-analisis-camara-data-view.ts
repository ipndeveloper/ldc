import { Terminal } from './terminal';
import { Producto } from './producto';

export class TipoAnalisisCamaraDataView {
    public nombre: string;
    public producto: Producto;
    public terminal: Terminal;
    public tipoAnalisis: string;
    public esEspecial: boolean;
    public codigo: number;
}
