import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { AutocompleteVagonComponent } from '../../../shared/autocomplete-vagon/autocomplete-vagon.component';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { TipoDocumentoPorte } from '../../shared/data-models/tipo-documento-porte';

@Component({
  selector: 'yrd-filtro-cambiar-tarjeta',
  templateUrl: './filtro-cambiar-tarjeta.component.html',
  styleUrls: ['./filtro-cambiar-tarjeta.component.css']
})
export class FiltroCambiarTarjetaComponent {

  @Input() documentoPorteForm: FormGroup;
  @Input() tipoProducto: TipoProducto;
  @Input() tipoTransporte: TipoTransporte;
  @Input() tipoDocumento: TipoDocumentoPorte;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('autocompleteVagon') autocompleteVagon: AutocompleteVagonComponent;
  @Input() maskRegex: Array<any>;

  @ViewChild('inputNumeroDocumentoPorte') inputNumeroDocumentoPorte: TextoConEtiquetaComponent;

  constructor(public readonly popupService: PopupService) { }

  validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };

  validationMessagesCTG = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CTG),
    pattern: Resources.Messages.ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero.format('12'),
    minlength: Resources.Messages.ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero.format('12'),
  };

  validationMessagesTipoDocPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDocumentoPorte),
  };

  validationMessagesNumeroVagon = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.NumeroDeVagon)
  };

  setFocus() {
    if (this.inputNumeroDocumentoPorte) {
      this.inputNumeroDocumentoPorte.setFocus();
    }
  }
}
