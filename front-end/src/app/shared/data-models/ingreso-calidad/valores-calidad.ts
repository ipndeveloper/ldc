import { Producto } from '../producto';
import { Grado } from '../grado';
import { AccionCalado } from './ingreso-calidad';
import { RubroCalidadMovimientoCereal } from './rubro-calidad-movimiento-cereal';

export class ValoresCalidad {
    factor: number;
    requiereAnalisisCamaraPorDefecto: boolean;
    producto: Producto;
    grado: Grado | null;
    accion: AccionCalado;
    rubros: RubroCalidadMovimientoCereal[];
}
