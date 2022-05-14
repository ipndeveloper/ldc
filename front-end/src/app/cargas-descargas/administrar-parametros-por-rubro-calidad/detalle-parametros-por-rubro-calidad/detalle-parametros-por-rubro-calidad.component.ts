import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';

@Component({
  selector: 'yrd-detalle-parametros-por-rubro-calidad',
  templateUrl: './detalle-parametros-por-rubro-calidad.component.html',
  styleUrls: ['./detalle-parametros-por-rubro-calidad.component.css']
})
export class DetalleParametrosPorRubroCalidadComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('codigoArchestra') codigoArchestra: TextoConEtiquetaComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  Permission = Permission;

  readonly validationMessagesEquivalenciaArchestra = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.EquivalenciaArchestra)
  };

  constructor() { }

  setFocus(): void {
    setTimeout(() => this.codigoArchestra.setFocus(), 0);
  }

}
