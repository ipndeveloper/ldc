import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableEstadoMovimientoComponent } from '../../../shared/desplegable-estado-movimiento/desplegable-estado-movimiento.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-detalle-administrar-tiempo-limite-estado',
  templateUrl: './detalle-administrar-tiempo-limite-estado.component.html',
  styleUrls: ['./detalle-administrar-tiempo-limite-estado.component.css']
})
export class DetalleAdministrarTiempoLimiteEstadoComponent {

  @Input() form: FormGroup;
  @ViewChild('estado') estado: DesplegableEstadoMovimientoComponent;

  readonly validationMessagesEstado = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Estado)
  };

  readonly validationMessagesTiempoLimite = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TiempoLimite)
  };

  constructor() {
  }

  setFocus() {
    setTimeout(() => this.estado.setFocus(), 0);
  }
}
