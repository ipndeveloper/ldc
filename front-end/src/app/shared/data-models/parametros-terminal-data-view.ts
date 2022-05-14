import { Destinatario } from './destinatario';
import { Corredor } from './corredor';

export class ParametrosTerminalDataView  {
    diferenciaDiasFiltroGeneracionArchivoMuestra: number;
    diferenciaDiasFiltroControlPeso: number;
    destinatarioPorDefecto: Destinatario;
    corredorPorDefecto: Corredor;
    sustentabilidadPorDefectoParaSoja: boolean;
    kgsBrutosEstimados: number;
    kgsTaraEstimados: number;
    usaMuestraIntacta: boolean;
}
