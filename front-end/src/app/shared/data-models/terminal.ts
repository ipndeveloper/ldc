import { Entity } from '../../core/models/entity';
import { Puerto } from './puerto';
import { Sede } from './sede';
import { Sociedad } from './sociedad';

export class Terminal extends Entity {
    constructor(public readonly id: number,
                public readonly descripcion: string,
                public readonly utilizaTarjeta: boolean,
                public readonly propietario: Sociedad,
                public readonly sede: Sede,
                public readonly puerto: Puerto,
                public readonly codigoAfip: string,
                public readonly seleccionaCosechaPorDefecto: boolean,
                public readonly usaAceptarYContinuar: boolean,
                public readonly usaFleteCorto: boolean,
                public readonly usaMuestraTipoAcopio: boolean) {
        super(id);
    }
}

