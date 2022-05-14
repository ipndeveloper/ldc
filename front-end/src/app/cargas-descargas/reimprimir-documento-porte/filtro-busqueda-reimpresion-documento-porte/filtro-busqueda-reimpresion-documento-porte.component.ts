import { Component, OnInit, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { AbstractControl, FormGroup, Validators } from '@angular/forms';
import { conformToMask } from 'text-mask-core';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { TipoProducto, EntitiesTiposProducto } from '../../../shared/data-models/tipo-producto';
import { TipoTransporte, EntitiesTiposTransporte } from '../../../shared/data-models/tipo-transporte';
import { Collection } from '../../../core/models/collection';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { ComportamientoAfip } from '../../../../app/shared/enums/enums';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';

@Component({
  selector: 'yrd-filtro-busqueda-reimpresion-documento-porte',
  templateUrl: './filtro-busqueda-reimpresion-documento-porte.component.html',
  styleUrls: ['./filtro-busqueda-reimpresion-documento-porte.component.css']
})
export class FiltroBusquedaReimpresionDocumentoPorteComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() disableButtons: boolean;
  @Output() buscarClicked = new EventEmitter();
  @ViewChild('inputNumeroDocumentoPorte') documentoPorte: TextoConEtiquetaComponent;

  tipoDocPorteRegex: Array<any>;
  tipoDocumentoSeleccionado: any;
  tipoProducto: TipoProducto[] = [EntitiesTiposProducto.SubProductos, EntitiesTiposProducto.Cereal];
  tipoTransporte: TipoTransporte = EntitiesTiposTransporte.Camion;
  regimenElectronico = false;
  readonly validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };
  readonly validationMessagesTipoDocPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDocumentoPorte),
  };
  readonly validationMessagesCtg = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CTG),
  };

  constructor(private readonly tipoDocumentoPorteService: TipoDocumentoPorteService,
              private readonly fcService: FormComponentService) {
  }

  ngOnInit() {
    this.subscribeCambioTipoDocumento();
  }

  onClickBuscar() {
    if (!this.fcService.isValidForm()) {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
    this.buscarClicked.emit();
  }

  onClickLimpiar() {
    this.fcService.resetForm();
  }

  setFocus(): any {
    setTimeout(() => {
      this.documentoPorte.setFocus();
    }, 0);
  }

  private subscribeCambioTipoDocumento() {
    const numeroCtg = this.form.get('ctg');
    const nroDocPorte = this.form.get('numeroDocumentoPorte');
    const tipoDocumento = this.form.get('tipoDocumentoPorte');
    if (tipoDocumento) {
      tipoDocumento.valueChanges.subscribe(() => {
        if (tipoDocumento.value) {
          this.tipoDocumentoSeleccionado = tipoDocumento.value;
          this.setMascaraPorTipoDocPorte();
        if (numeroCtg && nroDocPorte) {
          this.consultarRegimenAfip(this.tipoDocumentoSeleccionado, numeroCtg, nroDocPorte);
          }
        }
      });
    }
  }

  private setMascaraPorTipoDocPorte() {
    const nroDocPorte = this.form.get('numeroDocumentoPorte');
    if (this.tipoDocumentoSeleccionado && this.tipoDocumentoSeleccionado.mascara && nroDocPorte) {
      this.setTipoDocumentoPorteRegex();
      nroDocPorte.clearValidators();
      nroDocPorte.setValidators([Validators.maxLength(this.tipoDocumentoSeleccionado.mascara.length),
                                 Validators.minLength(this.tipoDocumentoSeleccionado.mascara.length),
                                 Validators.required]);
      this.setMascara();
    }
  }

  private setMascara() {
    const nroDocPorte = this.fcService.getValue('numeroDocumentoPorte');
    if (nroDocPorte && this.tipoDocPorteRegex) {
      const numeroSinMascara = nroDocPorte.replace(/[-]/, '');
      const numeroDoc = conformToMask(
        numeroSinMascara,
        this.tipoDocPorteRegex,
        { guide: false }
      );
      this.fcService.setValue('numeroDocumentoPorte', numeroDoc.conformedValue, { onlySelf: true });
    }
  }

  private setTipoDocumentoPorteRegex() {
    this.tipoDocPorteRegex = [];
    for (const char of this.tipoDocumentoSeleccionado.mascara) {
      if (char === '-') {
        this.tipoDocPorteRegex.push('-');
      } else {
        this.tipoDocPorteRegex.push(/[0-9 ]+/);
      }
    }
  }

  consultarRegimenAfip(tipoDocumento: any, ctgCtrl: AbstractControl, nroDocPorteCtrl: AbstractControl) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        this.regimenElectronico = regimenAfip === ComportamientoAfip.RegimenElectronico;
        if (this.regimenElectronico || tipoDocumento === undefined ) {
          ctgCtrl.enable();
          nroDocPorteCtrl.disable();
        } else {
          ctgCtrl.disable();
          nroDocPorteCtrl.enable();
        }
        ctgCtrl.reset();
        nroDocPorteCtrl.reset();
      });
  }
}
