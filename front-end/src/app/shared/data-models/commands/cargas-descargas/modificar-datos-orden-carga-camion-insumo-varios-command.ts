import { ControlarCargaCamionVariosCommand } from './controlar-carga-camion-varios-command';

export class ModificarDatosOrdenCargaCamionInsumoVariosCommand extends ControlarCargaCamionVariosCommand {
    patenteCamion: string;
    patenteAcoplado: string;
    idIntermediario: number;
    idRemitenteComercial: number;
    idcorredorVendedor: number;
    idDestinatario: number;
    tarifaFleteReferencia: number;
    tarifaFletePorTn: number;
    idTransportista: number;
    codigoFiscalTransportista: string;
    idChofer: number;
}
