import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-sobres-transporte',
  templateUrl: './filtro-administrar-sobres-transporte.component.html',
  styleUrls: ['./filtro-administrar-sobres-transporte.component.css']
})
export class FiltroAdministrarSobresTransporteComponent implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('nombre') nombre: TextoConEtiquetaComponent;

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    setTimeout(() => {
      if (this.nombre) {
        this.nombre.setFocus();
      }
    }, 0);
  }

}
