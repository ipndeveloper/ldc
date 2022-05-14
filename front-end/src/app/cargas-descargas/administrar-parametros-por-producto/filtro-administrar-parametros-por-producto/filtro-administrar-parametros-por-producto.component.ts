import { Component, ViewChild, Input } from '@angular/core';
import { Permission } from '../../../shared/enums/enums';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-filtro-administrar-parametros-por-producto',
  templateUrl: './filtro-administrar-parametros-por-producto.component.html',
  styleUrls: ['./filtro-administrar-parametros-por-producto.component.css']
})

export class FiltroAdministrarParametrosPorProductoComponent {

  @Input() form: FormGroup;
  @ViewChild('producto') producto: TextoConEtiquetaComponent;

  Permission = Permission;

  setFocus(): any {
    setTimeout(() => {
      this.producto.setFocus();
    }, 0);
  }

}
