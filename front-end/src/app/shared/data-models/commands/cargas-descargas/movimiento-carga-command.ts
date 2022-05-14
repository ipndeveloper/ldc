export class MovimientoCargaCommand  {
    public id: number;
    public patenteCamion: string;
    public patenteAcoplado: string;
    public ordenCarga: number;
    public fechaVencimiento: string;
    public estadoViaje: string;
    public idtipoCartaPorte: number;
    public estadoCabecera: string;
    public numeroCEE: number;
    public numeroContrato: number;
    public idProducto: number;
    public idCosecha: number;
    public idTitular: number;
    public idVendedor: number;
    public idIntermediario: number;
    public idRemitenteComercial: number;
    public idTipoPesada: number;
    public idCorredorComprador: number;
    public cantidadEst: string;
    public idEntregador: number;
    public idDestinatario: number;
    public idFinalidad: number;
    public establecimiento: string;
    public idSedeDestinatario: number;
    public idSedeVendedor: number;
    public idProcedencia: number;
    public destino: string;
    public idTransportista: number;
    public idChofer: number;
    public calle: string;
    public numero: string;
    public localidad: string;
    public codigoPostal: string;
    public provincia: string;
    public kilometrosRecorridos: number;
    public usuarioAlta: string;
}

export class CrearMovimientoCargaCommand extends MovimientoCargaCommand {}
export class ModificarMovimientoCargaCommand extends MovimientoCargaCommand {}
