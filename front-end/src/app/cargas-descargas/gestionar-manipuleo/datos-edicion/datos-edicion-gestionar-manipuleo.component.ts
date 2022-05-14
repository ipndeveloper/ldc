import { Component, Input, ViewChild, OnInit } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableTipoMovimientoComponent } from '../../../shared/desplegable-tipo-movimiento/desplegable-tipo-movimiento.component';
import { TiposMovimiento } from '../../../shared/enums/enums';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { EntityWithDescription } from '../../../core/models/entity-with-description';
import { DesplegablePlataformaDescargaComponent } from '../../../shared/desplegable-plataforma-descarga/desplegable-plataforma-descarga.component';
import { DesplegablePuntoCargaComponent } from '../../../shared/desplegable-punto-carga/desplegable-punto-carga.component';

@Component({
  selector: 'yrd-datos-edicion-gestionar-manipuleo',
  templateUrl: './datos-edicion-gestionar-manipuleo.component.html',
  styleUrls: ['./datos-edicion-gestionar-manipuleo.component.css']
})
export class DatosEdicionGestionarManipuleoComponent
  implements OnInit {

  @Input() form: FormGroup;
  @ViewChild('desplegableTipoMovimiento') desplegableTipoMovimiento: DesplegableTipoMovimientoComponent;
  @ViewChild('desplegablePlataforma') desplegablePlataforma: DesplegablePlataformaDescargaComponent;
  @ViewChild('desplegablePuntoCarga') desplegablePuntoCarga: DesplegablePuntoCargaComponent;
  esCarga: boolean;
  ingresaMaximoProteina: boolean;
  ingresaMaximoHumedad: boolean;
  private detalleFCService: FormComponentService;
  readonly validationMessagesTipoMovimiento = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoMovimiento)
  };
  readonly validationMessagesTipoTransporte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoTransporte)
  };
  readonly validationMessagesPuntoCarga = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PuntoCarga)
  };
  readonly validationMessagesPlataforma = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Plataforma)
  };
  readonly validationMessagesSilo = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Destino)
  };
  readonly validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto),
    searchValueNotValid: Resources.Messages.ElProductoNoExisteONoImputaStock
  };
  readonly validationMessagesHumedadMaxima = {
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0'),
    max: Resources.Messages.ElPorcentajeIngresadoDebeSerMenorOIgualA.format('100%'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros
  };
  readonly validationMessagesProteinaMinimo = {
    required : Resources.Messages.SeDebeIngresarUnValorMayorOIgualAX.format('0'),
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0'),
    max: Resources.Messages.ElPorcentajeIngresadoDebeSerMenorOIgualA.format('100%'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros
  };
  readonly validationMessagesProteinaMaximo = {
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0'),
    max: Resources.Messages.ElPorcentajeIngresadoDebeSerMenorOIgualA.format('100%'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros
  };
  readonly validationMessagesHumedadMinimo = {
    required : Resources.Messages.SeDebeIngresarUnValorMayorOIgualAX.format('0'),
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0'),
    max: Resources.Messages.ElPorcentajeIngresadoDebeSerMenorOIgualA.format('100%'),
    pattern: Resources.Messages.SeDebenIngresarNumerosEnteros
  };

  constructor(private readonly popupService: PopupService) {
    this.detalleFCService = new FormComponentService(this.popupService);
  }

  ngOnInit(): void {
    this.detalleFCService.initialize(this.form);
    this.subscribeTipoMovimiento();
  }

  private subscribeTipoMovimiento(): void {
    const tipoMovimientoCtrl = this.detalleFCService.getControl('tipoMovimiento');
    if (tipoMovimientoCtrl) {
      tipoMovimientoCtrl.valueChanges.subscribe((value: EntityWithDescription) => {
        this.esCarga = value && value.id === TiposMovimiento.Carga;
        this.deshabilitarControl(this.esCarga ? 'plataforma' : 'puntoCarga');
        this.habilitarControl(this.esCarga ? 'puntoCarga' : 'plataforma');
      });
    }
  }

  setFocus() {
    const tipoMovimientoCtrl = this.detalleFCService.getControl('tipoMovimiento');
    if (tipoMovimientoCtrl && tipoMovimientoCtrl.disabled) {
        tipoMovimientoCtrl.value.id === TiposMovimiento.Carga ? this.desplegablePuntoCarga.setFocus()
                                                              : this.desplegablePlataforma.setFocus();
    } else {
      this.desplegableTipoMovimiento.setFocus();
    }
  }

  private habilitarControl(control: string) {
    const formControl = this.detalleFCService.getControl(control);
    if (formControl) {
      formControl.enable();
      formControl.setValidators(Validators.required);
      formControl.updateValueAndValidity();
    }
  }

  private deshabilitarControl(control: string) {
    const formControl = this.detalleFCService.getControl(control);
    if (formControl) {
      formControl.setValue(undefined);
      formControl.disable();
      formControl.clearValidators();
      formControl.updateValueAndValidity();
    }
  }
}
