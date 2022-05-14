export class AutorizacionBalanzaCommand  {
    id: number;
    idMotivoErrorBalanzaCircuito: number;
    tope: number;
    habilitado: boolean;
    idsRolesPrimeraAutorizacion: number[];
    idsRolesSegundaAutorizacion: number[];
    idVendedor?: number;
}

export class CrearAutorizacionBalanzaCommand extends AutorizacionBalanzaCommand { }
export class ModificarAutorizacionBalanzaCommand extends AutorizacionBalanzaCommand { }
