import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-puntos-carga',
  templateUrl: './detalle-administrar-puntos-carga.component.html',
  styleUrls: ['./detalle-administrar-puntos-carga.component.css']
})
export class DetalleAdministrarPuntosCargaComponent implements OnInit {

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
