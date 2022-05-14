import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-roles',
  templateUrl: './filtro-administrar-roles.component.html',
  styleUrls: ['./filtro-administrar-roles.component.css']
})
export class FiltroAdministrarRolesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @ViewChild('descripcion') descripcion: TextoConEtiquetaComponent;

  constructor() { }

  ngOnInit() {
  }

  setFocus(): any {
    setTimeout(() => {
      this.descripcion.setFocus();
    }, 0);
  }

}
