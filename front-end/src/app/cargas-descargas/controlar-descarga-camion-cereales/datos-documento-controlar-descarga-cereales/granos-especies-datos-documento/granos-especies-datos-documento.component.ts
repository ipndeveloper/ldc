import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { TipoProducto } from '../../../../shared/data-models/tipo-producto';

@Component({
  selector: 'yrd-granos-especies-datos-documento',
  templateUrl: './granos-especies-datos-documento.component.html',
  styleUrls: ['./granos-especies-datos-documento.component.css']
})
export class GranosEspeciesDatosDocumentoComponent {

  @Input() form: FormGroup;
  @Input() fillCampoEpa: boolean;
  @Input() fillCosecha: boolean;
  @Input() tipoProducto: TipoProducto;

  validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoCorrespondeAlCircuito
  };

  validationMessagesCosecha = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Cosecha)
  };

  validationMessagesKilosBrutos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosBruto),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, '0'),
    pattern: 'Se deben ingresar números enteros.',
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosBruto, Resources.Labels.KilosTara),
    max: 'El Campo Kilos Bruto debe ser menor a 2,147,483,647'
  };

  validationMessagesKilosTara = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilosTara),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilosTara, '0'),
    pattern: 'Se deben ingresar números enteros.',
    kgBrutoGreaterThanKgTara: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.KilosTara, Resources.Labels.KilosBruto),
    max: 'El Campo Kilos Tara debe ser menor a 2,147,483,647'
  };

  validationMessagesProcedencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Procedencia)
  };

  constructor() { }

}
