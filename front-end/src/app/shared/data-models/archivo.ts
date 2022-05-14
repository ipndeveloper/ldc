export class Archivo {
    constructor(readonly contenido: number[],
                readonly peso: number,
                readonly nombre?: string,
                readonly extension?: string) {
    }
}
