import { ChoferDataView } from './chofer-data-view';
import { Usuario } from './usuario';

export class PenalizacionChoferDataView {
    public id: number;
    public chofer: ChoferDataView;
    public terminal: number;
    public responsablePenalizacion: Usuario;
    public motivoSancion: String;
    public fechaDesde: Date;
    public fechaHasta: Date;
    public habilitado: Boolean;
    public responsableLevantamiento: Usuario;
}
