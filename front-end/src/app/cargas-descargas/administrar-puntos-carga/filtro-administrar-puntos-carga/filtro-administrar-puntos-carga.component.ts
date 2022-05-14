import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-puntos-carga',
  templateUrl: './filtro-administrar-puntos-carga.component.html',
  styleUrls: ['./filtro-administrar-puntos-carga.component.css']
})
export class FiltroAdministrarPuntosCargaComponent implements OnInit {

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
