import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { TipoProducto } from '../../../../shared/data-models/tipo-producto';
import { TipoTransporte } from '../../../../shared/data-models/tipo-transporte';
import { TextoMascaraConEtiquetaComponent } from '../../../../core/controls/texto-mascara-con-etiqueta/texto-mascara-con-etiqueta.component';
import { NumeroConEtiquetaComponent } from '../../../../core/controls/numero-con-etiqueta/numero-con-etiqueta.component';
import { Terminal } from '../../../../shared/data-models/terminal';

@Component({
  selector: 'yrd-carta-porte-datos-documento',
  templateUrl: './carta-porte-datos-documento.component.html',
  styleUrls: ['./carta-porte-datos-documento.component.css']
})
export class CartaPorteDatosDocumentoComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() maximo = 8;
  @Input() formDocumentoPorte: FormGroup;
  @Input() maskRegex: Array<any>;
  @Input() esCartaPorteElectronica = false;
  @Input() esAlta = false;
  @Input() esConsulta = false;
  @Input() esFueraCircuito = false;
  @Input() tipoProducto: TipoProducto;
  @Input() tipoTransporte: TipoTransporte;
  @Input() circuitoContemplaCupo: boolean;
  @Input() terminal: Terminal;
  @Input() movimientoPrecargado = false;
  @Input() esModificacionFueraDePuesto = false;
  @Input() tieneAfipAutomatico = false;
  @ViewChild('inputNumeroDocumentoPorte') inputNumeroDocumentoPorte: TextoMascaraConEtiquetaComponent;
  @ViewChild('inputNumeroCEE') inputNumeroCEE: NumeroConEtiquetaComponent;
  @ViewChild('inputNumeroCTG') inputNumeroCTG: NumeroConEtiquetaComponent;
  @Output() recuperarDatoCpe: EventEmitter<any> = new EventEmitter();

  validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };

  validationMessagesNumeroCEE = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroCEE),
    minlength: 'El CEE ingresado debe tener 14 dígitos y ser distinto de cero'
  };

  validationMessagesFechaCarga = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaCarga)
  };

  validationMessagesFechaVencimiento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaVencimiento)
  };

  validationMessagesCTG = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CTG),
    pattern: Resources.Messages.ElNumeroCTGDebeContenerHastaXDigitosYSerDistintoDeCero
  };


  get muestraNumeroDocPorte(): boolean {
    if (!this.esConsulta && this.esAlta) {
      return !this.circuitoContemplaCupo;
    } else {
      /* Si esFueraCircuito es undefined, es porque no se
      envía como parámetro a la consulta de Gestionar Movimientos
      y no debe mostrarse el número de documento de porte */
      if (this.esFueraCircuito === undefined) {
        return false;
      }

      return !this.esFueraCircuito;
    }
  }


  ngOnInit() {
    this.setFocus();
  }

  setFocus(): void {
    setTimeout(() => {
      if ((!this.esCartaPorteElectronica || !this.tieneAfipAutomatico) && this.inputNumeroDocumentoPorte) {
        this.inputNumeroDocumentoPorte.setFocus();
      } else if (this.esCartaPorteElectronica && this.tieneAfipAutomatico && this.inputNumeroCTG) {
        this.inputNumeroCTG.setFocus();
      }
    }, 0);
  }

  setFocusSinDocumentoPorte(): void {
    setTimeout(() => {
      if (this.inputNumeroCEE) {
        this.inputNumeroCEE.setFocus();
      }
    }, 0);
  }

  OnBlurRecuperarDatoCpe(): void {
    this.recuperarDatoCpe.emit();
  }

}
