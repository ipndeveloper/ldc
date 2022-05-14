import { ControlarCargaCamionCommand } from './controlar-carga-command';

export class ModificarDatosOrdenCargaCamionCommand extends ControlarCargaCamionCommand {
    patenteCamion: string;
    patenteAcoplado: string;
    idTitular: number;
    idIntermediario: number;
    idRemitenteComercial: number;
    idCorredorComprador: number;
    idEntregador: number;
    idDestinatario: number;
    destino: string;
    idTransportista: number;
    codigoFiscalTransportista: string;
    idChofer: number;
}
