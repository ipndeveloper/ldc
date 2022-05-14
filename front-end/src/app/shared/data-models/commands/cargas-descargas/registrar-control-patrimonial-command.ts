export class RegistrarControlPatrimonialCommand {
    id: number;
    estaAceptado: boolean;
    observaciones: string;
    archivos: ArchivoRegistrarControlPatrimonialCommand[];
}

export class ArchivoRegistrarControlPatrimonialCommand {
    contenido: number[];
    nombre: string;
    extension: string;
}
