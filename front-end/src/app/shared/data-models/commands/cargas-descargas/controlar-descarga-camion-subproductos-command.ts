import { Autorizacion } from '../../../../cargas-descargas/shared/autorizacion/autorizacion';

export class ControlarDescargaCamionSubproductosCommand {
  public id: number;
  public esModificacion: boolean;
  public patenteCamion: string;
  public patenteAcoplado: string;
  public fechaCarga: string;
  public fechaVencimiento: string;
  public numeroTarjeta: string; // Falta en BE
  public idProducto: number;
  public idTitular: number;
  public idVendedor: number;
  public idIntermediario: number;
  public idRemitenteComercial: number;
  public idCorredor: number;
  public fleteCargoLdc: number | null;
  public idTipoPesada: number;
  public idEntregador: number;
  public idDestinatario: number;
  public kgBruto: number | null;
  public kgTara: number | null;
  public idFinalidad: number;
  public idProcedencia: number;
  public idSedeOrigen: number;
  public idDestino: number;
  public idSedeDestino: number;
  public observaciones: string;
  public codigoFiscalTransportista: string;
  public idTransportista: number;
  public idChofer: number;
  public idTipoProducto: number;
  public idCosecha: number;
  public numeroVagon: number;
  public operativo: number;
  public idFerrocarril: number;
  public autorizaciones: Autorizacion[];
  public esModificacionDocPorte: boolean;
  public numeroCEE: number | null;
  public version: string;

  constructor(  public readonly idCircuito: number,
                public readonly idTipoDocumentoPorte: number,
                public readonly numeroDocumentoPorte: string) {
  }
}
