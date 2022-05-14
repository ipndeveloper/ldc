import { EntityWithDescription } from '../../core/models/entity-with-description';
import { Vendedor } from './vendedor';

export class AutorizacionBalanzaDataView {
    id: number;
    circuito: EntityWithDescription;
    esEntrada: boolean;
    motivoErrorBalanzaCircuito: EntityWithDescription;
    tope: number;
    habilitado: boolean;
    rolesPrimeraAutorizacion: EntityWithDescription[];
    rolesSegundaAutorizacion: EntityWithDescription[];
    sociedad: Vendedor;
    vendedor: string;
}
