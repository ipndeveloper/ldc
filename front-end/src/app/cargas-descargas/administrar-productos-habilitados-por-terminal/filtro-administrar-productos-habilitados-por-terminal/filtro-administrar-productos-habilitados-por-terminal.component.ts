import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-productos-habilitados-por-terminal',
  templateUrl: './filtro-administrar-productos-habilitados-por-terminal.component.html',
  styleUrls: ['./filtro-administrar-productos-habilitados-por-terminal.component.css']
})
export class FiltroAdministrarProductosHabilitadosPorTerminalComponent {

  Permission = Permission;

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  constructor() { }

  setFocus() {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

}
