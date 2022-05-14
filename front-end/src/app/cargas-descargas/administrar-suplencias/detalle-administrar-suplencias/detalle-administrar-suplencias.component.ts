import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Resources } from '../../../../locale/artifacts/resources';
import { FormGroup } from '@angular/forms';
import { BuscadorUsuarioComponent } from '../../../shared/buscador-usuario/buscador-usuario.component';
import { FechaConEtiquetaComponent } from '../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';

@Component({
  selector: 'yrd-detalle-administrar-suplencias',
  templateUrl: './detalle-administrar-suplencias.component.html',
  styleUrls: ['./detalle-administrar-suplencias.component.css']
})
export class DetalleAdministrarSuplenciasComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('usuarioOrigen') usuarioOrigen: BuscadorUsuarioComponent;
  @ViewChild('fechaDesde') fechaDesde: FechaConEtiquetaComponent;

  validationMessagesUsuarioOrigen = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.UsuarioOrigen)
  };
  validationMessagesUsuarioDestino = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.UsuarioDestino)
  };
  validationMessagesFechaDesde = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaDesde)
  };
  validationMessagesFechaHasta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaHasta)
  };

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
    setTimeout(() => {
      if (this.esModificacion) {
        this.fechaDesde.setFocus();
      } else {
        this.usuarioOrigen.setFocus();
      }
    }, 0);
  }

}
