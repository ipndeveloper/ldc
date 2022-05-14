import { Component, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-usuarios',
  templateUrl: './filtro-administrar-usuarios.component.html',
  styleUrls: ['./filtro-administrar-usuarios.component.css']
})

export class FiltroAdministrarUsuariosComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @ViewChild('usuario') usuario: TextoConEtiquetaComponent;

  setFocus() {
    setTimeout(() => {
      this.usuario.setFocus();
    }, 0);
  }

}
