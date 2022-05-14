import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-parametros-por-terminal',
  templateUrl: './filtro-administrar-parametros-por-terminal.component.html',
  styleUrls: ['./filtro-administrar-parametros-por-terminal.component.css']
})

export class FiltroAdministrarParametrosPorTerminalComponent {

  @Input() form: FormGroup;
  @Input() disableFiltros: boolean;
  @Output() buscar = new EventEmitter();
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  readonly Permission = Permission;

  readonly validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  constructor() {
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }
}
