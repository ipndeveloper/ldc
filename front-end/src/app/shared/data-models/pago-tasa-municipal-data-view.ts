import { Moneda } from './moneda';
import { MedioDePago } from './medio-de-pago';
import { EstadoPagoTasaMunicipal } from './estado-pago-tasa-municipal';


export class PagoTasaMunicipalDataView {
    public id: number;
    public idMovimiento: number;
    public tipoDocumentoPorte: string;
    public numeroDocumentoPorte: string;
    public patenteCamion: string;
    public tarifa: string;
    public kgPesoBruto: string;
    public moneda: Moneda;
    public medioDePago: MedioDePago;
    public estadoPago: EstadoPagoTasaMunicipal;
    public ticketDePago: string;
}
