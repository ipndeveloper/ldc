import { Input, ViewChild, Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-texto-gmp',
  templateUrl: './filtro-administrar-texto-gmp.component.html',
  styleUrls: ['./filtro-administrar-texto-gmp.component.css']
})
export class FiltroAdministrarTextoGmpComponent {

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
