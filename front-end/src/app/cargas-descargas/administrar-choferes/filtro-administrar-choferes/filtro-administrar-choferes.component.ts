import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-choferes',
  templateUrl: './filtro-administrar-choferes.component.html',
  styleUrls: ['./filtro-administrar-choferes.component.css']
})


export class FiltroAdministrarChoferesComponent implements OnInit {
  @Input() form: FormGroup;
  @ViewChild('cuil') cuil: TextoConEtiquetaComponent;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.cuil.setFocus();
    }, 0);
  }

}

