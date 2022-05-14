import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-puestos-de-trabajo',
  templateUrl: './filtro-administrar-puestos-de-trabajo.component.html',
  styleUrls: ['./filtro-administrar-puestos-de-trabajo.component.css']
})

export class FiltroAdministrarPuestosDeTrabajoComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  Permission = Permission;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }

}

