import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CheckboxConEtiquetaComponent } from '../../../core/controls/checkbox-con-etiqueta/checkbox-con-etiqueta.component';
import { Permission } from '../../../shared/enums/enums';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';

@Component({
  selector: 'yrd-detalle-administrar-texto-gmp',
  templateUrl: './detalle-administrar-texto-gmp.component.html',
  styleUrls: ['./detalle-administrar-texto-gmp.component.css']
})
export class DetalleAdministrarTextoGmpComponent  {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @ViewChild('habilitado') habilitado: CheckboxConEtiquetaComponent;

  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  readonly validationMessagesSociedad = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Sociedad)
  };

  readonly validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };

  readonly validationMessagesLeyendaGmp = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.LeyendaGmp)
  };

  readonly Permission = Permission;

  constructor() { }

  setFocusTerminal(): void {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

  setFocusHabilitado() {
    setTimeout(() => {
      this.habilitado.setFocus();
    }, 0);
  }
}
