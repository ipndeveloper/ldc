import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-suplencias',
  templateUrl: './filtro-administrar-suplencias.component.html',
  styleUrls: ['./filtro-administrar-suplencias.component.css']
})
export class FiltroAdministrarSuplenciasComponent implements OnInit {

  @ViewChild('usuarioOrigen') usuarioOrigen: TextoConEtiquetaComponent ;
  @Input() form: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    setTimeout(() => {
      this.usuarioOrigen.setFocus();
    }, 0);
  }

}
