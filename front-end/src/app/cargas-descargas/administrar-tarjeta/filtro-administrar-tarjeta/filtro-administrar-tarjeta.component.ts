import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-filtro-administrar-tarjeta',
  templateUrl: './filtro-administrar-tarjeta.component.html',
  styleUrls: ['./filtro-administrar-tarjeta.component.css']
})
export class FiltroAdministrarTarjetaComponent {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  readonly permission = Permission;
  readonly validationMessagesNumero = {
    required: Resources.Messages.ElXEsRequerido.format(Resources.Labels.NumeroTarjeta),
    rangoIngresadoIncorrecto: Resources.Messages.CodigoTarjetaHastaMayorACodigoTarjetaDesde
  };

  constructor() {
  }

  setFocus(): void {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }
}
