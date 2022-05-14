import { Component, Input, EventEmitter, Output, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TextoMascaraConEtiquetaComponent } from '../../../core/controls/texto-mascara-con-etiqueta/texto-mascara-con-etiqueta.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-cupo',
  templateUrl: './cupo.component.html',
  styleUrls: ['./cupo.component.css']
})
export class CupoComponent implements OnInit {
  @Input() cupoForm: FormGroup;
  @Input() maskRegex: Array<any>;
  @Output() codigoCupoBlur = new EventEmitter();
  @Input() ingresoConCupo = false;
  @Input() ingresoSinCupo = true;
  @Input() esConsulta = false;

  @ViewChild('inputCodigoCupo') codigoCupo: TextoMascaraConEtiquetaComponent;

  validationMessagesCodigoCupo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoCupo),
    maxlength: Resources.Messages.ElCampocodigoCupoNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampocodigoCupoNoCoindideConElLargoDeLaMascara,
    CupoIngresadoNoExiste: Resources.Messages.ElCupoIngresadoNoExiste,
    CupoInvalido: Resources.Messages.ElCupoNoEsValido
  };

  constructor() { }

  ngOnInit(): void {
  }

  public setFocus() {
    this.codigoCupo.setFocus();
  }

}
