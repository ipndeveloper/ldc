import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-filtro-administrar-tipo-documento-porte-tipo-producto',
  templateUrl: './filtro-administrar-tipo-documento-porte-tipo-producto.component.html',
  styleUrls: ['./filtro-administrar-tipo-documento-porte-tipo-producto.component.css']
})
export class FiltroAdministrarTipoDocumentoPorteTipoProductoComponent implements OnInit {
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
