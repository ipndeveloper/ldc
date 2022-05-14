import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-tarjeta-autorizacion',
  templateUrl: './filtro-administrar-tarjeta-autorizacion.component.html',
  styleUrls: ['./filtro-administrar-tarjeta-autorizacion.component.css']
})
export class FiltroAdministrarTarjetaAutorizacionComponent
  implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  readonly Permission = Permission;

  constructor() {
  }

  ngOnInit(): void {
  }

  setFocus(): void {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }
}
