import { Component, Input, ViewChild } from '@angular/core';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormGroup } from '@angular/forms';
import { Permission } from '../../../shared/enums/enums';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-detalle-administrar-impresoras',
  templateUrl: './detalle-administrar-impresoras.component.html',
  styleUrls: ['./detalle-administrar-impresoras.component.css']
})

export class DetalleAdministrarImpresorasComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('nombre') nombre: TextoConEtiquetaComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  Permission = Permission;

  validationMessagesNombre = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre)
  };

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  validationMessagesUncPath = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.UncPath)
  };

  constructor() { }

  setFocus(): void {
    setTimeout(() => this.nombre.setFocus(), 0);
  }
}
