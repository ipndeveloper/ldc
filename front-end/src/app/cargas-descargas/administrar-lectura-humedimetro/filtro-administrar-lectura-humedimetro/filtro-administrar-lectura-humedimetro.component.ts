import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { BuscadorProductoComponent } from '../../../shared/buscador-producto/buscador-producto.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-lectura-humedimetro',
  templateUrl: './filtro-administrar-lectura-humedimetro.component.html',
  styleUrls: ['./filtro-administrar-lectura-humedimetro.component.css']
})

export class FiltroAdministrarLecturaHumedimetroComponent {

  @Input() form: FormGroup;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @ViewChild('buscadorProducto') buscadorProducto: BuscadorProductoComponent;

  readonly permiso = Permission.AdministrarLecturaHumedimetro;

  setFocus(): void {
    setTimeout(() => {
      this.terminal.setFocus();
    }, 0);
  }
}
