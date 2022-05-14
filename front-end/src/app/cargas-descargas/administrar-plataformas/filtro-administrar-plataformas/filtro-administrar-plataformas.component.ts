import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-plataformas',
  templateUrl: './filtro-administrar-plataformas.component.html',
  styleUrls: ['./filtro-administrar-plataformas.component.css']
})
export class FiltroAdministrarPlataformasComponent implements OnInit {
  @Input() form: FormControl;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  Permission = Permission;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }

}
