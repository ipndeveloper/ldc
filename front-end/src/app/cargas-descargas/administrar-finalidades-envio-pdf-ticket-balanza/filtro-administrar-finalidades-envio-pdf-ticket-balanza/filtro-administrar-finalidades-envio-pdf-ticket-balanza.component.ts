import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { DesplegableFinalidadComponent } from '../../../shared/desplegable-finalidad/desplegable-finalidad.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-finalidades-envio-pdf-ticket-balanza',
  templateUrl: './filtro-administrar-finalidades-envio-pdf-ticket-balanza.component.html',
  styleUrls: ['./filtro-administrar-finalidades-envio-pdf-ticket-balanza.component.css']
})
export class FiltroAdministrarFinalidadesEnvioPdfTicketBalanzaComponent {

  @Input() form: FormGroup;
  @ViewChild('circuito') circuito: DesplegableCircuitoComponent;
  @ViewChild('finalidad') finalidad: DesplegableFinalidadComponent;

  readonly permission = Permission;

  constructor() { }

  setFocus(): any {
    setTimeout(() => {
      this.circuito.setFocus();
    }, 0);
  }

  bindFinalidad(circuito: Circuito) {
    this.finalidad.obtenerTodos = false;
    this.finalidad.circuito = circuito;
    this.finalidad.databind();
  }
}
