import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-dispositivos',
  templateUrl: './detalle-administrar-dispositivos.component.html',
  styleUrls: ['./detalle-administrar-dispositivos.component.css']
})

export class DetalleAdministrarDispositivosComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @Input() habilitaBalancero: boolean;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  readonly Permission = Permission;

  readonly validationMessagesNombre = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre)
  };

  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  readonly validationMessagesTipoDispositivo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDispositivo)
  };

  readonly validationMessagesSentidoBalanza = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.SentidoBalanza)
  };

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }
}

