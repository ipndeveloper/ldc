import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-detalle-administrar-tipos-puestos-trabajo',
  templateUrl: './detalle-administrar-tipos-puestos-trabajo.component.html',
  styleUrls: ['./detalle-administrar-tipos-puestos-trabajo.component.css']
})
export class DetalleAdministrarTiposPuestosTrabajoComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('descripcion') descripcion: TextoConEtiquetaComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  validationMessagesDescripcion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Descripcion)
  };

  setFocus(): void {
    if (this.descripcion) {
      setTimeout(() => this.descripcion.setFocus(), 0);
    }
  }

}
