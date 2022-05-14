import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-importar-sobres-transporte',
  templateUrl: './filtro-importar-sobres-transporte.component.html',
  styleUrls: ['./filtro-importar-sobres-transporte.component.css']
})
export class FiltroImportarSobresTransporteComponent implements OnInit {

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
