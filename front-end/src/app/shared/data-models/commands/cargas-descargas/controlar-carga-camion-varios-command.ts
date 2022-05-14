export class ControlarCargaCamionVariosCommand {
  public id: number;
  public idViaje: number;
  public idCircuito: number;
  public idActividad: number;
  public idTipoDocumentoPorte: number;
  public numeroDocumentoPorte: string;
  public numeroTarjeta: string;
  public numeroCEE: string;
  public observaciones: string;
  public idEstadoMovimiento: number;
  public numeroTramiteCOT: string;
  public numeroCOT: string;
  public version: string;
  public idTransportista: number;
  public idCondicionManipuleo: number;
  public fechaStockSan: string;
  public idSedeDestino: number;
  public idSedeOrigen: number;
  public idDestinatario: number;
}

export class CrearCargaCamionVariosCommand extends ControlarCargaCamionVariosCommand {}
export class ModificarCargaCamionVariosCommand extends ControlarCargaCamionVariosCommand {}
