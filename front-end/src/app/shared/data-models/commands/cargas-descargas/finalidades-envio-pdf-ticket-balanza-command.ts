export class FinalidadesEnvioPdfTicketBalanzaCommand  {
    id: number;
    idCircuito: number;
    idFinalidad: number;
    estaHabilitado: boolean;
}

export class CrearFinalidadesEnvioPdfTicketBalanzaCommand extends FinalidadesEnvioPdfTicketBalanzaCommand { }
export class ModificarFinalidadesEnvioPdfTicketBalanzaCommand extends FinalidadesEnvioPdfTicketBalanzaCommand { }
