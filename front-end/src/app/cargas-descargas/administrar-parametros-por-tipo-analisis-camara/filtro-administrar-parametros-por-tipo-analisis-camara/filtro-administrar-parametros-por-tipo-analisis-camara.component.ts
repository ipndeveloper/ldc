import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Permission } from '../../../shared/enums/enums';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { Producto } from '../../../shared/data-models/producto';
import { Terminal } from '../../../shared/data-models/terminal';

@Component({
  selector: 'yrd-filtro-administrar-parametros-por-tipo-analisis-camara',
  templateUrl: './filtro-administrar-parametros-por-tipo-analisis-camara.component.html',
  styleUrls: ['./filtro-administrar-parametros-por-tipo-analisis-camara.component.css']
})
export class FiltroAdministrarParametrosPorTipoAnalisisCamaraComponent implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  Permission = Permission;
  terminalSeleccionada: Terminal;
  productoSeleccionado: Producto;

  readonly validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };

  constructor() {
  }

  ngOnInit() {
    this.form.controls.terminal.valueChanges.subscribe((terminal: Terminal) => {
      this.terminalSeleccionada = terminal;
    });
    this.form.controls.producto.valueChanges.subscribe((producto: Producto) => {
      this.productoSeleccionado = producto;
    });
  }

  setFocus(): any {
    setTimeout(() => this.terminal.setFocus(), 0);
  }
}
