import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-dispositivos',
  templateUrl: './filtro-administrar-dispositivos.component.html',
  styleUrls: ['./filtro-administrar-dispositivos.component.css']
})

export class FiltroAdministrarDispositivosComponent {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  readonly Permission = Permission;

  setFocus(): any {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

}
