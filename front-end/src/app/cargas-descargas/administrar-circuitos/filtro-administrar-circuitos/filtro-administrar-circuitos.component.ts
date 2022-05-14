import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-circuitos',
  templateUrl: './filtro-administrar-circuitos.component.html',
  styleUrls: ['./filtro-administrar-circuitos.component.css']
})

export class FiltroAdministrarCircuitosComponent {
  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  Permission = Permission;

  setFocus(): any {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

}
