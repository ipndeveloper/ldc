export class ResolverEventoCommand {
    public pathArchestra: string;
    public idEvento: number;
    public decision: number;
    public parametros: Array<ResolverEventoParametro> = new Array<ResolverEventoParametro>();
    public idBitacora: number;
    public idDispositivo: number;

    constructor(pathArchestra: string, idEvento: number, decision: number, parametros: Array<ResolverEventoParametro>, idBitacora: number) {
        this.pathArchestra = pathArchestra;
        this.idEvento = idEvento;
        this.decision = decision;
        this.parametros = parametros;
        this.idBitacora = idBitacora;
    }
}

export class ResolverEventoParametro {
    public key: string;
    public value: string;

    constructor(key: string, value: string) {
        this.key = key;
        this.value = value;
    }
}
