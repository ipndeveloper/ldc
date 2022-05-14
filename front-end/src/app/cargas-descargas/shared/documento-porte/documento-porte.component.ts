import { Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { AutocompleteVagonComponent } from '../../../shared/autocomplete-vagon/autocomplete-vagon.component';

import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { TipoDocumentoPorte } from '../data-models/tipo-documento-porte';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';

@Component({
  selector: 'yrd-documento-porte',
  templateUrl: './documento-porte.component.html',
  styleUrls: ['./documento-porte.component.css']
})
export class DocumentoPorteComponent {

  @Input() documentoPorteForm: FormGroup;
  @Input() tipoProducto: TipoProducto;
  @Input() tipoTransporte: TipoTransporte;
  @Input() tipoDocumento: TipoDocumentoPorte;
  @Input() esCartaPorteElectronica = false;
  @Input() esVagonCerealElectronica = false;
  @Input() esFueraCircuito = false;
  @Input() esVagon = false;
  @Input() cupea = false;
  @Input() esModificacionDocPorte = false;
  @Input() habilitarControlesTipoTransporte = false;
  @Input() esConsulta = false;
  @Input() disableBotonBuscar = false;
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;
  @ViewChild('autocompleteVagon') autocompleteVagon: AutocompleteVagonComponent;
  @Output() recuperarDocPorteClicked: EventEmitter<string> = new EventEmitter<string>();
  @Output() buscarMovimientoClicked: EventEmitter<any> = new EventEmitter();
  @Output() recuperarDatoCpe: EventEmitter<any> = new EventEmitter();
  @Input() maskRegex: Array<any>;
  @Input() esCarga = false;
  @Input() spinnerDocumentoPorte = false;
  @Input() soloCamionYTren = false;

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

  validationMessagesTitular = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Titular)
  };

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };
  setFocus() {
    if (this.inputNumeroDocumentoPorte) {
      this.inputNumeroDocumentoPorte.setFocus();
    }
  }

  recuperarDocPorte(): void {
    const nroDocumentoPorte = this.documentoPorteForm.get('numeroDocumentoPorte');
    if (nroDocumentoPorte && nroDocumentoPorte.value) {
      this.recuperarDocPorteClicked.emit();
    } else {
      this.popupService.error(Resources.Messages.DebeIngresarNroDocPorteARecuperar);
    }
  }

  buscarMovimiento(): void {
    const nroDocumentoPorte = this.documentoPorteForm.get('numeroDocumentoPorte');
    if (nroDocumentoPorte && nroDocumentoPorte.value) {
      this.buscarMovimientoClicked.emit();
    } else {
      this.popupService.error(Resources.Messages.DebeIngresarNroDocPorteARecuperar);
    }
  }

  OnBlurRecuperarDatoCpe(): void {
    this.recuperarDatoCpe.emit();
  }
}
