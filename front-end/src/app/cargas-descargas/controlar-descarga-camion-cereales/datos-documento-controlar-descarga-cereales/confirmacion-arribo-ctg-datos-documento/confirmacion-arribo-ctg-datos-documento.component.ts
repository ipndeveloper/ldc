import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-confirmacion-arribo-ctg-datos-documento',
  templateUrl: './confirmacion-arribo-ctg-datos-documento.component.html',
  styleUrls: ['./confirmacion-arribo-ctg-datos-documento.component.css']
})
export class ConfirmacionArriboCtgDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Input() esCartaPorteElectronica = false;
  @Input() confirmoCtg = false;
  @Input() confirmoManualmente = false;

  validationMessagesCodCancelacionCTG = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodCancelacionCTG),
  };

  constructor() { }

}
