export class ResolverEventoAutorizacionesCommand {
    public pathArchestra: string;
    public decision: boolean;
    public motivoNoDescargaId: number;
    public idBitacora: number | null;
    public idDispositivo: number;
    constructor(pathArchestra: string, motivoNoDescargaId: number, decision: boolean, idBitacora: number | null) {
        this.pathArchestra = pathArchestra;
        this.motivoNoDescargaId = motivoNoDescargaId;
        this.decision = decision;
        this.idBitacora = idBitacora;
    }
}
