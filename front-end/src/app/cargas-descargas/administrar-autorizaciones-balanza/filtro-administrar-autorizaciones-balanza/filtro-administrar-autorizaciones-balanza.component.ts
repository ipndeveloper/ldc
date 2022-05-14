import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-autorizaciones-balanza',
  templateUrl: './filtro-administrar-autorizaciones-balanza.component.html',
  styleUrls: ['./filtro-administrar-autorizaciones-balanza.component.css']
})

export class FiltroAdministrarAutorizacionesBalanzaComponent {

  @Input() form: FormGroup;
  @ViewChild('circuito') circuito: DesplegableCircuitoComponent;

  Permission = Permission;

  setFocus() {
    setTimeout(() => {
      this.circuito.setFocus();
    }, 0);
  }

}
