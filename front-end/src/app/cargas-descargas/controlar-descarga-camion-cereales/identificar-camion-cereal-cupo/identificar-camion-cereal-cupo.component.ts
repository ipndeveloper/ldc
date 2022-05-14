import { Component, Input, Output, EventEmitter, ViewChild, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { TextoMascaraConEtiquetaComponent } from '../../../core/controls/texto-mascara-con-etiqueta/texto-mascara-con-etiqueta.component';
import { TipoTransporte } from '../../../shared/data-models/tipo-transporte';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';
import { NumeroConEtiquetaComponent } from '../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';

@Component({
  selector: 'yrd-identificar-camion-cereal-cupo',
  templateUrl: './identificar-camion-cereal-cupo.component.html',
  styleUrls: ['./identificar-camion-cereal-cupo.component.css']
})
export class IdentificarCamionCerealCupoComponent implements OnInit {

  @Input() spinnerDocumentoPorte = false;
  @Input() esCartaPorteElectronica = false;
  @Input() maskRegex: Array<any>;
  @Input() form: FormGroup;
  @Input() tipoProducto: TipoProducto;
  @Input() tipoTransporte: TipoTransporte;
  @Input() disableBotonBuscar = false;
  @Output() buscarMovimientoClicked: EventEmitter<any> = new EventEmitter();
  @ViewChild('inputNumeroDocumentoPorte') inputNumeroDocumentoPorte: TextoMascaraConEtiquetaComponent;
  @ViewChild('inputNumeroCTG') inputNumeroCTG: NumeroConEtiquetaComponent;

  validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };

  validationMessagesTipoDocPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDocumentoPorte),
  };
  constructor(private readonly popupService: PopupService) { }

  ngOnInit() {
    this.setFocus();
  }

  buscarMovimiento(): void {
    const nroDocumentoPorte = this.form.get('numeroDocumentoPorte');
    const ctg = this.form.get('ctg');
    if ((nroDocumentoPorte && nroDocumentoPorte.value && !this.esCartaPorteElectronica) ||
        (ctg && ctg.value && this.esCartaPorteElectronica)) {
      this.buscarMovimientoClicked.emit();
    } else {
      this.popupService.error(Resources.Messages.DebeIngresarNroDocPorteARecuperar);
    }
  }

  setFocus(): void {
    setTimeout(() => {
      if (!this.esCartaPorteElectronica && this.inputNumeroDocumentoPorte) {
        this.inputNumeroDocumentoPorte.setFocus();
      } else if (this.esCartaPorteElectronica && this.inputNumeroCTG) {
        this.inputNumeroCTG.setFocus();
      }
    }, 0);
  }

}
