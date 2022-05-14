import { Autorizacion } from '../../../../cargas-descargas/shared/autorizacion/autorizacion';

export class ControlarDescargaCerealesCommand {
  public id: number;
  public esModificacion: boolean;
  public patenteCamion: string;
  public patenteAcoplado: string;
  public fechaCarga: string;
  public fechaVencimiento: string;
  public numeroCEE: number | null;
  public numeroTarjeta: string; // Falta en BE
  public idProducto: number;
  public idTipoGrano: number;
  public idTitularCartaPorte: number;
  public idVendedor: number;
  public numeroEstablecimiento: number | null;
  public idCampoEpaSustentable: number;  // Falta en BE
  public idCosecha: number;
  public idIntermediario: number;
  public idRemitenteComercial: number;
  public idCorredorComprador: number;
  public fleteCargoLdc: number | null;
  public idMercadoTermino: number; // Falta en BE
  public idTipoPesada: number;
  public idCorredorVendedor: number;
  public kilometrosRecorridos: number | null;
  public idEntregador: number;
  public tarifaReferencia: number | null;
  public idDestinatario: number;
  public tarifaTN: number | null; // Falta en BE
  public idIntermediarioFlete: number;
  public kgBruto: number | null;
  public kgTara: number | null;
  public idTipoCartaPorte: number;
  public idFinalidad: number;
  public idProcedencia: number;
  public idSedeOrigen: number;
  public idSedeDestino: number;
  public observaciones: string;
  public codigoFiscalTransportista: string;
  public idTransportista: number;
  public aceptarSinConfirmarCtg: boolean;
  public confirmadoManualmente: boolean;
  public idChofer: number;
  public codigoTrazabilidadGrano: number | null;
  public codigoCancelacionCtg: number | null;
  public sustentabilidad: boolean;
  public numeroVagon: number;
  public operativo: number;
  public idFerrocarril: number;
  public autorizaciones: Autorizacion[];
  public esModificacionDocPorte: boolean;
  public version: string;
  public idCodigoCupo: number | null;
  public codigoCupo: string;
  public idEstadoInicialCupo: number | null;
  public movimientoAplicadoEnSan: boolean;
  public idMotivoCupo: number | null;
  public idTurnoCircular: number | null;
  public turnoCircularVigente: boolean;
  public esFleteCorto: boolean;
  public esRegimenElectronico: boolean | null;


  constructor(  public readonly idCircuito: number,
                public readonly idTipoDocumentoPorte: number,
                public readonly numeroDocumentoPorte: string) {
  }
}
