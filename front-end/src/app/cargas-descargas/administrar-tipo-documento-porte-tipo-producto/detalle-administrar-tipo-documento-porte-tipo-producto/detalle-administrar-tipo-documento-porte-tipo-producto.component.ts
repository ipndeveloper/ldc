import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../shared/desplegable-terminal/desplegable-terminal.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-tipo-documento-porte-tipo-producto',
  templateUrl: './detalle-administrar-tipo-documento-porte-tipo-producto.component.html',
  styleUrls: ['./detalle-administrar-tipo-documento-porte-tipo-producto.component.css']
})
export class DetalleAdministrarTipoDocumentoPorteTipoProductoComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;

  get detalleDeshabilitado() {
    return this.form.status === 'DISABLED';
  }

  Permission = Permission;

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };

  validationMessagesTipoDocumentoPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDocumentoPorte)
  };

  validationMessagesTipoProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoProducto)
  };

  constructor() { }

  ngOnInit() {
  }

  setFocus(): void {
    setTimeout(() => this.terminal.setFocus(), 0);
  }

}
