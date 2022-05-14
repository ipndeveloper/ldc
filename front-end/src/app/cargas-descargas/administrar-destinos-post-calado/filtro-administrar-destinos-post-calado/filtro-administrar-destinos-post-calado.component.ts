import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-destinos-post-calado',
  templateUrl: './filtro-administrar-destinos-post-calado.component.html',
  styleUrls: ['./filtro-administrar-destinos-post-calado.component.css']
})

export class FiltroAdministrarDestinosPostCaladoComponent implements OnInit {
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
