import { EntityWithDescription } from '../../core/models/entity-with-description';
import { EntityWithCode } from '../../core/models/entity-with-code';

export class ParametrosPorTerminal {
  public id: number;
  public terminal: EntityWithDescription;
  public direccion: string;
  public tipoTarjeta: EntityWithDescription;
  public sede: EntityWithCode;
  public abreviatura: string;
  public utilizaTarjeta: boolean;
  public copiasTicketCalidadVagon: number;
  public copiasTicketCalidad: number;
  public copiasTicketPesaje: number;
  public copiasRemito: number;
  public diferenciaDiasFiltroControlPeso: number;
  public diferenciaDiasFiltroGeneracionArchivoMuestra: number;
  public horaCorteCupo: Date;
  public kgsBrutosEstimados: number;
  public kgsTaraEstimados: number;
  public rolAutorizadorControl: EntityWithDescription;
  public destinatarioPorDefecto: EntityWithDescription;
  public horasExpiracionRespuestaEntregador: number;
  public codigosBarras: number[];
  public expresionesRegularPatente: number[];
  public leyendaBonificacionTrigo: boolean;
  public usaAceptarYContinuar: boolean;
  public usaFleteCorto: boolean;
  public usaMuestraIntacta: boolean;
  public codigoAduana: string;
  public nroLote: string;
  public toleranciaTurnoCircular: number;
}
