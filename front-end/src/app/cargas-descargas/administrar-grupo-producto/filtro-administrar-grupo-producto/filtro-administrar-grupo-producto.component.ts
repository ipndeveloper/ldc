import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-grupo-producto',
  templateUrl: './filtro-administrar-grupo-producto.component.html',
  styleUrls: ['./filtro-administrar-grupo-producto.component.css']
})
export class FiltroAdministrarGrupoProductoComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('descripcion') descripcion: TextoConEtiquetaComponent;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => {
      this.descripcion.setFocus();
    }, 0);
  }
}
