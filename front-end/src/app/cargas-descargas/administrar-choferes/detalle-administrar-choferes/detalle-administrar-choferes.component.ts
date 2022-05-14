import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-detalle-administrar-choferes',
  templateUrl: './detalle-administrar-choferes.component.html',
  styleUrls: ['./detalle-administrar-choferes.component.css']
})

export class DetalleAdministrarChoferesComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('cuilDetalle') cuil: TextoConEtiquetaComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  validationMessagesNombre = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Nombre)
  };

  validationMessagesCuil = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Cuil)
  };

  constructor() { }

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => this.cuil.setFocus(), 0);
  }
}
