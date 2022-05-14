export class RegistrarSalidaSinDescargaCommand {
    id: number;
    observaciones?: string;
    rechazarConCTG: boolean;
    sinTarjeta: boolean;

    constructor(id: number, rechazarConCTG: boolean, sinTarjeta: boolean, observaciones?: string) {
        this.id = id;
        this.observaciones = observaciones;
        this.rechazarConCTG = rechazarConCTG;
        this.sinTarjeta = sinTarjeta;
    }
}
