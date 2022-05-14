export class AgregarTrabajoGeneracionArchivoMuestrasCommand {
    constructor (public readonly fechaDesde: Date, public readonly fechaHasta: Date,
        public readonly enviaMail: boolean, public readonly esManual: boolean) {
    }
}
