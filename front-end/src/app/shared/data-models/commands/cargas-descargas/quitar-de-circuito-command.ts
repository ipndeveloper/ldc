export class QuitarDeCircuitoCommand {
    id: number;
    observaciones: string;

    constructor(id: number, observaciones: string) {
        this.id = id;
        this.observaciones = observaciones;
    }
}
