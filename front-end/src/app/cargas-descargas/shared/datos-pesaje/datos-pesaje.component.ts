import { Component, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, AbstractControl } from '@angular/forms';
import { BalanzaService } from '../services/balanza.service';
import { PesoRegistrado } from '../../registrar-peso/peso-registrado';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Resources } from '../../../../locale/artifacts/resources';
import { HttpErrorResponse } from '@angular/common/http';
import * as HttpStatus from 'http-status-codes';
import { createNumberMask } from 'text-mask-addons';

@Component({
  selector: 'yrd-datos-pesaje',
  templateUrl: './datos-pesaje.component.html',
  styleUrls: ['./datos-pesaje.component.css']
})
export class DatosPesajeComponent {
  @Input() datosPesajeForm: FormGroup;
  @Input() esAutomatico: boolean;
  @Input() esFueraCircuito: boolean;
  @Input() esConsulta: boolean;
  @Input() esEntrada: boolean;
  @Input() idAccion: number;
  @Input() idMovimiento?: number;
  @Input() patente: string;
  @Input() tarjeta: string;
  @Input() esDescarga = true;
  @Output() tomarPesaje: EventEmitter<void> = new EventEmitter<void>();
  @Output() completeMotivosPesajeBruto: EventEmitter<void> = new EventEmitter<void>();
  @Output() completeMotivosPesajeTara: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('pesoEntrada') pesoBruto: ElementRef;
  @ViewChild('pesoSalida') pesoTara: ElementRef;
  @ViewChild('btnTomarPeso') btnTomarPeso: ElementRef;

  get pesosTomados(): FormArray {
    return this.datosPesajeForm.get('pesosTomados') as FormArray;
  }

  get pesaBruto(): Boolean {
    return (this.esEntrada && this.esDescarga) || (!this.esEntrada && !this.esDescarga);
  }

  mask: any;
  isLoading = false;

  constructor(private readonly fb: FormBuilder,
              private readonly balanzaService: BalanzaService,
              private readonly popupService: PopupService) {
    this.mask = createNumberMask({
      prefix: '',
      includeThousandsSeparator: false,
    });
  }

  dispararControlPesajeBruto() {
    this.completeMotivosPesajeBruto.emit();
  }

  dispararControlPesajeTara() {
    this.completeMotivosPesajeTara.emit();
  }

  tomarPeso() {
    this.tomarPesaje.emit();
    this.isLoading = true;
    this.balanzaService.tomarPeso(this.idMovimiento || 0, this.tarjeta, this.patente, this.idAccion).subscribe(peso => {
      this.isLoading = false;

      let repesaje;
      let pesoATomar;

      if (this.pesaBruto) {
        pesoATomar = this.datosPesajeForm.controls.kilosBruto;
        repesaje = this.datosPesajeForm.controls.brutoEsRepesaje;

      } else {
        pesoATomar = this.datosPesajeForm.controls.kilosTara;
        repesaje = this.datosPesajeForm.controls.taraEsRepesaje;
      }

      if (!repesaje.value && this.pesosTomados.length >= 1) {
        this.popupService.confirm(Resources.Messages.DeseaVolverAPesar).then(respuesta => {
          if (respuesta) {
            repesaje.setValue(true);
            this.setPeso(peso, pesoATomar);
          }
        });
      } else {
        this.setPeso(peso, pesoATomar);
      }
    }, (error: HttpErrorResponse) => {
      this.isLoading = false;
      if (error.status === HttpStatus.BAD_GATEWAY) {
        this.popupService.error(error.error.message, 'Error de Conexión');
      }
    });
  }

  private setPeso(pesoRegistrado: PesoRegistrado, pesoATomar: AbstractControl) {
    pesoATomar.setValue(pesoRegistrado.peso);

    if (this.pesaBruto) {
      this.dispararControlPesajeBruto();
    } else {
      this.dispararControlPesajeTara();
    }

    this.addPesajeTomado(pesoRegistrado);

    this.setFocusPesaje();
  }

  private addPesajeTomado(pesoTomado: PesoRegistrado): void {
    this.pesosTomados.push(this.buildPesoTomado(pesoTomado));
  }

  clearPesosTomadosArray() {
    while (this.pesosTomados.length !== 0) {
      this.pesosTomados.removeAt(0);
    }
  }

  private buildPesoTomado(peso: PesoRegistrado): FormGroup {
    peso.fechaPesada = new Date(Date.now()).toLocalISOString();
    const pesoTomado = this.fb.group({
      peso: peso.peso,
      fechaPesada: peso.fechaPesada
    });
    return pesoTomado;
  }

  setFocusPesaje() {
    if (this.esAutomatico) {
      this.btnTomarPeso.nativeElement.focus();
    } else {
      if (this.pesaBruto) {
        this.pesoBruto.nativeElement.focus();
      } else {
        this.pesoTara.nativeElement.focus();
      }
    }
  }
}
