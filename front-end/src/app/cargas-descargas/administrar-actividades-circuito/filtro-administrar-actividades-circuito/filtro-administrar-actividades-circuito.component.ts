import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableCircuitoComponent } from '../../../shared/desplegable-circuito/desplegable-circuito.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-actividades-circuito',
  templateUrl: './filtro-administrar-actividades-circuito.component.html',
  styleUrls: ['./filtro-administrar-actividades-circuito.component.css']
})
export class FiltroAdministrarActividadesCircuitoComponent implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('circuito') circuito: DesplegableCircuitoComponent;

  Permission = Permission;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.circuito.setFocus();
    }, 0);
  }
}
