import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { ResultadosPesaje, MotivosErrorBalanza, EstadosMovimiento } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-modal-situacion-balanza',
  templateUrl: './modal-situacion-balanza.component.html',
  styleUrls: ['./modal-situacion-balanza.component.css']
})

export class ModalSituacionBalanzaComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('realizaDescargaCarga') realizaDescargaCarga: ElementRef;
  @Input() form: FormGroup;
  @Input() esEntrada: boolean;
  @Input() esDescarga = true;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();
  @Input() esInsumoLiquidoRechazado = false;
  @Input() idEstado = 0;
  textoDescargaCarga = '';
  textoFieldset = '';
  labelHeader = '';
  puedeContinuar = false;
  valorDescargoCargo = ResultadosPesaje.Exito;
  valorNoDescargoCargo = ResultadosPesaje.Error;
  valorCargoConError = ResultadosPesaje.CargoConError;
  valorAnterior = '';
  cerradoEnAceptar = false;

  get esAptoBalanzaEntradaVueltaCargado(): boolean {
    return this.idEstado === EstadosMovimiento.AptoBalanzaEntradaVueltaCargado;
  }

  private readonly fcService: FormComponentService;

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
  }

  open() {
    this.fcService.initialize(this.form);
    this.valorAnterior = this.form.controls.realizaDescargaCarga.value;
    this.textoFieldset = this.esEntrada ? Resources.Labels.Ingreso : Resources.Labels.Egreso;
    this.labelHeader = this.esEntrada ? Resources.Labels.SituacionEntrada : Resources.Labels.SituacionSalida;
    if (this.esDescarga) {
      this.textoDescargaCarga = this.esEntrada ? Resources.Labels.Descarga : Resources.Labels.Descargo;
    } else {
      this.textoDescargaCarga = this.esEntrada ? Resources.Labels.Carga : Resources.Labels.Cargo;
    }

    this.updateValidators(true);
    this.modal.open();
    setTimeout(() => this.realizaDescargaCarga.nativeElement.focus(), 0);
  }

  onAccept() {
    let marcoErrorCuandoNoHayMotivos: boolean;
    let realizoDescargaCargaEnEntrada = ResultadosPesaje.Exito;
    const eligeDescargar = this.form.controls.realizaDescargaCarga.value;
    const hayMotivosSeleccionados = this.form.controls.motivos.value.filter(m => m.checked).length > 0;

    if (this.esEntrada) {
      const hayBloqueantes = this.form.controls.motivos.value.filter(m => m.checked && m.esBloqueante) as Array<any>;

      marcoErrorCuandoNoHayMotivos = !hayMotivosSeleccionados && eligeDescargar === ResultadosPesaje.Error;

      this.puedeContinuar = (hayBloqueantes.length === 0 && eligeDescargar === ResultadosPesaje.Exito) ||
                            (hayBloqueantes.length === 0 && eligeDescargar === ResultadosPesaje.Error && hayMotivosSeleccionados) ||
                            (hayBloqueantes.length >= 1 && eligeDescargar === ResultadosPesaje.Error) ;

      if (this.esAptoBalanzaEntradaVueltaCargado) {
        this.puedeContinuar = this.esAptoBalanzaEntradaVueltaCargado && eligeDescargar === ResultadosPesaje.Exito;
      }
    } else {
      const diferenciaPesoEntreBalanzas = this.form.controls.motivos.value.filter(m => m.checked &&
                                                                          m.id === MotivosErrorBalanza.DiferenciaPesoEntreBalanzas);
      const brutoMenorATara = this.form.controls.motivos.value.filter(m => m.checked &&
        m.id === MotivosErrorBalanza.BrutoMenorOIgualATara);

      const excedeToleranciaMaxima = this.form.controls.motivos.value.filter(m => m.checked &&
        m.id === MotivosErrorBalanza.ExedeToleranciaPeso);

      realizoDescargaCargaEnEntrada = this.form.controls.realizoDescargaCargaEnEntrada.value;

      marcoErrorCuandoNoHayMotivos = realizoDescargaCargaEnEntrada === ResultadosPesaje.Exito &&
                                      eligeDescargar !== ResultadosPesaje.Exito &&
                                      !hayMotivosSeleccionados;

      if (realizoDescargaCargaEnEntrada === ResultadosPesaje.Error) {
        this.puedeContinuar = eligeDescargar === ResultadosPesaje.Error  ||
                              (this.esInsumoLiquidoRechazado && diferenciaPesoEntreBalanzas.length > 0);
      } else if (!this.esDescarga) {
        const hayBloqueantes = this.form.controls.motivos.value.filter(m => m.checked && m.esBloqueante);
        this.puedeContinuar = ((brutoMenorATara.length > 0 && eligeDescargar !== ResultadosPesaje.Exito) ||
                               (brutoMenorATara.length === 0 &&
                               (hayBloqueantes.length === 0 ||
                               (hayBloqueantes.length > 0 && eligeDescargar === ResultadosPesaje.CargoConError)))) &&
                              (excedeToleranciaMaxima.length > 0 && eligeDescargar !== ResultadosPesaje.Error ||
                              excedeToleranciaMaxima.length === 0 && !marcoErrorCuandoNoHayMotivos);
      } else {
        this.puedeContinuar = realizoDescargaCargaEnEntrada && !marcoErrorCuandoNoHayMotivos;
      }
    }

    if (!this.puedeContinuar) {
      if (marcoErrorCuandoNoHayMotivos && realizoDescargaCargaEnEntrada === ResultadosPesaje.Exito) {
        this.popupService.error(Resources.Messages.DebeIngresarUnMotivoDeError);
      } else {
        this.popupService.error(Resources.Messages.LaAccionElegidaNoEsValidaEnLaSituacionActual);
      }
    } else {
      if (this.form.controls.realizaDescargaCarga.value == null) {
        this.popupService.error(Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Accion));
      }

      if (this.fcService.isValidForm()) {
        this.cerradoEnAceptar = true;
        this.accepted.emit();
        this.modal.close();
        this.cerradoEnAceptar = false;
      }
    }
  }

  close() {
    this.updateValidators(false);
    this.modal.close();
  }

  onClosing() {
    if (!this.cerradoEnAceptar) {
      this.form.controls.realizaDescargaCarga.setValue(this.valorAnterior);
    }
    this.closing.emit();
  }

  private updateValidators(required: boolean) {
    if (required) {
      this.form.controls.realizaDescargaCarga.setValidators(Validators.required);
    } else {
      this.form.controls.realizaDescargaCarga.clearValidators();
    }
  }
}
