import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-notificaciones',
  templateUrl: './filtro-administrar-notificaciones.component.html',
  styleUrls: ['./filtro-administrar-notificaciones.component.css']
})
export class FiltroAdministrarNotificacionesComponent {
  @Input() form: FormGroup;
  @Input() opcionFecha:  false;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  readonly Permission = Permission;

  constructor() {
  }

  setFocus() {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }
}
