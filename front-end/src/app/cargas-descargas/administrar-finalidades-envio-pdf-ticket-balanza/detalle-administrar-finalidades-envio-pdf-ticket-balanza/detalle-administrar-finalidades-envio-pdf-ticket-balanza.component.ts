import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { Circuito } from '../../../shared/data-models/circuito/circuito';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { DesplegableFinalidadComponent } from '../../../shared/desplegable-finalidad/desplegable-finalidad.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-finalidades-envio-pdf-ticket-balanza',
  templateUrl: './detalle-administrar-finalidades-envio-pdf-ticket-balanza.component.html',
  styleUrls: ['./detalle-administrar-finalidades-envio-pdf-ticket-balanza.component.css']
})
export class DetalleAdministrarFinalidadesEnvioPdfTicketBalanzaComponent {

  @Input() form: FormGroup;
  @ViewChild('circuito') circuito: DesplegableCircuitoComponent;
@ViewChild('finalidad') finalidad: DesplegableFinalidadComponent;

  readonly permission = Permission;

  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Circuito)
  };

  readonly validationMessagesFinalidad = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Finalidad)
  };

  readonly validationMessagesCircuito = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Circuito)
  };

  constructor() { }

  setFocus(): void {
    setTimeout(() => this.circuito.setFocus(), 0);
  }

  bindFinalidad(circuito: Circuito | null = null) {
    if (circuito) {
      this.finalidad.obtenerTodos = false;
    } else {
      this.finalidad.obtenerTodos = true;
    }
    this.finalidad.circuito = circuito as Circuito;
    this.finalidad.databind();
  }
}
