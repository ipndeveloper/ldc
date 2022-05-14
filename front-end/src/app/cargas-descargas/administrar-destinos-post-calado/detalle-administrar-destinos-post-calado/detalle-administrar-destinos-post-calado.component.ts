import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-destinos-post-calado',
  templateUrl: './detalle-administrar-destinos-post-calado.component.html',
  styleUrls: ['./detalle-administrar-destinos-post-calado.component.css']
})
export class DetalleAdministrarDestinosPostCaladoComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  Permission = Permission;

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  validationMessagesDestino = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destino)
  };

  constructor() { }

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }

}
