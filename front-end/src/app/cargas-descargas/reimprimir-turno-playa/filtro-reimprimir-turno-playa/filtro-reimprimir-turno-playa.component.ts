import { Component, Input, Output, EventEmitter, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { EntitiesTiposTransporte } from '../../../shared/data-models/tipo-transporte';
import { Collection } from '../../../core/models/collection';
import { DesplegableTipoDocumentoPorteComponent } from '../../shared/desplegable-tipo-documento-porte/desplegable-tipo-documento-porte.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { conformToMask } from 'text-mask-core';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ComportamientoAfip, TiposDocumentoPorte } from '../../../shared/enums/enums';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { TipoDocumentoPorteService } from '../../shared/desplegable-tipo-documento-porte/tipo-documento-porte.service';


@Component({
  selector: 'yrd-filtro-reimprimir-turno-playa',
  templateUrl: './filtro-reimprimir-turno-playa.component.html',
  styleUrls: ['./filtro-reimprimir-turno-playa.component.css']
})

export class FiltroReimprimirTurnoPlayaComponent
  implements OnInit, OnDestroy {

  @Input() form: FormGroup;
  @Input() disableButtons: boolean;
  @Output() buscarClicked = new EventEmitter();
  @ViewChild('tipoDocumentoPorte') desplegableDocPorte: DesplegableTipoDocumentoPorteComponent;

  tipoDocPorteRegex: Array<any>;
  tipoDocumentoSeleccionado: any;
  private fcService: FormComponentService;
  private readonly onDestroy = new Subject();
  readonly tipoTransporte = EntitiesTiposTransporte;
  readonly validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };
  readonly validationMessagesTipoDocPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoDocumentoPorte),
  };
  readonly validationMessagesVendedor = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Vendedor)
  };

  constructor(private readonly popupService: PopupService,
    private readonly tipoDocumentoPorteService: TipoDocumentoPorteService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit(): void {
    this.fcService.initialize(this.form);
    this.subscribeCambioTipoDocumento();
  }

  onClickBuscar(): void {
    if (this.fcService.isValidForm()) {
      this.buscarClicked.emit();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
      this.setFocus();
    }
  }

  onClicklimpiar(): void {
    this.fcService.resetForm();
  }

  setFocus(): void {
    setTimeout(() => {
      if (this.desplegableDocPorte) {
        this.desplegableDocPorte.setFocus();
      }
    }, 0);
  }

  ngOnDestroy(): void {
    this.onDestroy.next(true);
    this.onDestroy.complete();
  }

  private subscribeCambioTipoDocumento(): void {
    const tipoDocumento = this.form.get('tipoDocumentoPorte');
    if (tipoDocumento) {
      tipoDocumento.valueChanges.pipe(
          distinctUntilChanged((x, y) => (x && y) ? x.id === y.id : false),
          takeUntil(this.onDestroy)
        ).subscribe(() => {
        if (tipoDocumento.value) {
          this.tipoDocumentoSeleccionado = tipoDocumento.value;
          this.fcService.setValue('numeroDocumentoPorte', '', { onlySelf: true });
          this.setVendedorValidators();
          this.consultarRegimenAfip(tipoDocumento.value);
        }
      });
    }
  }

  consultarRegimenAfip(tipoDocumento: any) {
    const ctg = this.form.get('ctg');
    const numeroDocumentoPorte = this.form.get('numeroDocumentoPorte');

    if (ctg && numeroDocumentoPorte) {
    this.tipoDocumentoPorteService.consultarComportamientoAfip(tipoDocumento ? tipoDocumento.id : 0)
      .subscribe(regimenAfip => {
        if ((regimenAfip === ComportamientoAfip.RegimenElectronico) || (tipoDocumento === undefined)) {
          ctg.enable();
          this.setMascaraPorTipoDocPorte();
          numeroDocumentoPorte.updateValueAndValidity();
        } else {
          ctg.disable();
          this.setMascaraPorTipoDocPorte();
          numeroDocumentoPorte.setValidators(Validators.required);
        }
        ctg.reset();
      });
    }
  }

  private setMascaraPorTipoDocPorte(): void {
    const nroDocPorte = this.form.get('numeroDocumentoPorte');
    if (this.tipoDocumentoSeleccionado && this.tipoDocumentoSeleccionado.mascara && nroDocPorte) {
      this.setTipoDocumentoPorteRegex();
      nroDocPorte.clearValidators();
      nroDocPorte.setValidators([Validators.maxLength(this.tipoDocumentoSeleccionado.mascara.length),
                                 Validators.minLength(this.tipoDocumentoSeleccionado.mascara.length)]);
      this.setMascara();
    }
  }

  private setMascara(): void {
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

  private setTipoDocumentoPorteRegex(): void {
    this.tipoDocPorteRegex = [];
    for (const char of this.tipoDocumentoSeleccionado.mascara) {
      if (char === '-') {
        this.tipoDocPorteRegex.push('-');
      } else {
        this.tipoDocPorteRegex.push(/[0-9 ]+/);
      }
    }
  }

  private setVendedorValidators(): void {
    const vendedor = this.form.get('vendedor');
    if (vendedor) {
      vendedor.clearValidators();
      if (this.tipoDocumentoSeleccionado.id === TiposDocumentoPorte.Remito) {
        vendedor.setValidators(Validators.required);
      }
      vendedor.updateValueAndValidity();
    }
  }

}
