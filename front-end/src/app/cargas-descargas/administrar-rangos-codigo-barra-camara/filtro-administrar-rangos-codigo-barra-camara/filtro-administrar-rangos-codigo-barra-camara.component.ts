import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-rangos-codigo-barra-camara',
  templateUrl: './filtro-administrar-rangos-codigo-barra-camara.component.html',
  styleUrls: ['./filtro-administrar-rangos-codigo-barra-camara.component.css']
})
export class FiltroAdministrarRangosCodigoBarraCamaraComponent implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  Permission = Permission;

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

}
