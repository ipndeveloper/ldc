export class DecisionControlPatrimonial {
    id: number;
    decision: string;
    observaciones: string;
    fechaHora: string;
    usuario: string;
    archivos: ArchivoDecisionControlPatrimonial[];
    cantidadArchivos: number;
}

export class ArchivoDecisionControlPatrimonial {
    id: number;
    nombreArchivo: string;
    extensionArchivo: string;
}
