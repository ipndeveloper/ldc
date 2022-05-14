import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { AuthService } from '../../../../app/core/services/session/auth.service';

@Component({
  selector: 'yrd-detalle-cambiar-tarjeta',
  templateUrl: './detalle-cambiar-tarjeta.component.html',
  styleUrls: ['./detalle-cambiar-tarjeta.component.css']
})
export class DetalleCambiarTarjetaComponent {

  @Input() detalleForm: FormGroup;
  @Input() modoEdicion: boolean;

  @ViewChild('tarjetaNueva') tarjetaNueva: NumeroConEtiquetaComponent;

  @Output() aceptado = new EventEmitter();
  @Output() cancelado = new EventEmitter();

  private readonly terminalUtilizaTarjeta: boolean;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta)
  };

  constructor(authService: AuthService) {

    const userContext = authService.getUserContext();
      if (userContext) {
        this.terminalUtilizaTarjeta = userContext.terminal.utilizaTarjeta;
      }
   }

  aceptar() {
    this.aceptado.emit();
  }

  cancelar() {
    this.cancelado.emit();
  }

  setFocus() {
    this.tarjetaNueva.setFocus();
  }

  onBlurNumeroTarjeta(): void {
    if (this.terminalUtilizaTarjeta) {
      this.aceptar();
    }
  }

  botonAceptarDeshabilitado(): boolean {
    return !this.modoEdicion || this.terminalUtilizaTarjeta;
  }
}
