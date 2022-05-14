import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-cupo-datos-documento',
  templateUrl: './cupo-datos-documento.component.html',
  styleUrls: ['./cupo-datos-documento.component.css']
})
export class CupoDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Input() ingresoConCupo = false;
  @Input() ingresoSinCupo = false;
  @Input() esAlta = false;
  @Input() esConsulta = false;
  @Output() informarCambioCupo = new EventEmitter();
  @Input() codigoCupoRegex: any;

  validationMessagesTarjeta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Tarjeta)
  };

  validationMessagesCodigoCupo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoCupo),
    maxlength: Resources.Messages.ElCampocodigoCupoNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampocodigoCupoNoCoindideConElLargoDeLaMascara,
    CupoIngresadoNoExiste: Resources.Messages.ElCupoIngresadoNoExiste,
    CupoInvalido: Resources.Messages.ElCupoNoEsValido
  };

  constructor() { }

  cambioCupo() {
    this.informarCambioCupo.emit();
  }
}
