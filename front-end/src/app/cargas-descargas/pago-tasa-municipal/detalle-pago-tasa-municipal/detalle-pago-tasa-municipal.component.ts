import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { PagoTasaMunicipalDataView } from '../../../shared/data-models/pago-tasa-municipal-data-view';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { LecturaQRComponent } from '../../shared/lectura-qr/lectura-qr.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { MediosDePago, EstadosPagoTasaMunicipal } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-pago-tasa-municipal',
  templateUrl: './detalle-pago-tasa-municipal.component.html',
  styleUrls: ['./detalle-pago-tasa-municipal.component.css']
})
export class DetallePagoTasaMunicipalComponent implements OnInit {
  idMovimiento: number;
  modoPagar: boolean;
  LeyendaDetalle: string;

  @ViewChild('pesoBrutoInput') pesoBrutoInput: TextoConEtiquetaComponent;
  @ViewChild('qr') qrComponent: LecturaQRComponent;
  @ViewChild('ticketDePago') ticketDePago: TextoConEtiquetaComponent;

  @Input() form: FormGroup;
  @Input() disableButtons: boolean;

  @Output() pagarClicked = new EventEmitter();
  @Output() noPagarClicked = new EventEmitter();
  @Output() limpiarClicked = new EventEmitter();
  @Output() qrAceptado = new EventEmitter();
  @Output() reembolsarClicked = new EventEmitter();

  private readonly fcService: FormComponentService;

  validationMessagesMoneda = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Moneda)
  };
  validationMessagesMedioDePago = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.MedioDePago)
  };
  validationMessagesPesoBruto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PesoBruto)
  };
  validationMessagesTicketDePago = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TicketDePago)
  };

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit(): void {
    this.fcService.initialize(this.form);
    this.setEnablePagoForm();
    this.setEnableMedioPago(false);
    this.subscribeChanges();
    this.LeyendaDetalle = 'Procesar Pago';
    this.modoPagar = true;
  }

  subscribeChanges(): void {
    const medioDePagoCtrl = this.form.get('medioDePago');
    const ticketDePagoCtrl = this.form.get('ticketDePago');
    if (medioDePagoCtrl) {
        medioDePagoCtrl.valueChanges.subscribe((value: any) => {
          if (ticketDePagoCtrl) {
            if (value && this.EsMedioDePagoEfectivo(value) && this.modoPagar) {
              ticketDePagoCtrl.enable();
            } else {
              this.form.controls.ticketDePago.reset();
              ticketDePagoCtrl.disable();
            }
          }
          this.form.controls.qr.reset();
      });
    }
  }

  keyPressAlphaNumeric(event) {
    const inp = String.fromCharCode(event.keyCode);
    if (/[ñÑa-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

  public EsMedioDePagoEfectivo(value: any) {
    return value.id === MediosDePago.Efectivo;
  }

  setEnableMedioPago(enable: boolean): void {
    const medioDePago = this.fcService.getControl('medioDePago');
    if (this.form && medioDePago) {
      if (enable) {
        medioDePago.enable();
      } else {
        medioDePago.disable();
      }
    }
  }

  setEnablePagoForm(): void {
    const moneda = this.fcService.getControl('moneda');
    if (this.form && moneda) {
      moneda.disable();
    }

    const ticketDePago = this.fcService.getControl('ticketDePago');
    if (this.form && ticketDePago) {
      ticketDePago.disable();
    }
  }

  completaDatoMovimiento(movimiento: PagoTasaMunicipalDataView | null): void {
    if (movimiento) {
      this.setEnablePagoForm();

      if (movimiento.estadoPago && movimiento.estadoPago.id === EstadosPagoTasaMunicipal.Pago) {
        this.modoPagar = false;
        this.LeyendaDetalle = 'Procesar Reembolso';
      } else {
        this.modoPagar = true;
        this.LeyendaDetalle = 'Procesar Pago';
      }
      this.setEnableMedioPago(this.modoPagar);
      this.fcService.setValue('id', movimiento.id, {onlySelf: true});
      this.idMovimiento = movimiento.idMovimiento;
      this.fcService.setValue('pesoBruto', movimiento.kgPesoBruto, {onlySelf: true});
      this.fcService.setValue('tarifa', movimiento.tarifa, {onlySelf: true});
      this.fcService.setValue('moneda', movimiento.moneda, {onlySelf: true});
      if (movimiento.medioDePago && movimiento.medioDePago.id !== MediosDePago.NoAplica) {
        this.fcService.setValue('medioDePago', movimiento.medioDePago, {onlySelf: true});
      }
      this.fcService.setValue('ticketDePago', movimiento.ticketDePago, {onlySelf: true});
    }
  }

  onClickPagar(): void {
    this.pagarClicked.emit();
  }

  onClickReembolsar(): void {
    this.reembolsarClicked.emit();
  }

  onClickNoPagar(): void {
    this.noPagarClicked.emit();
  }

  onClickLimpiar(): void {
    this.limpiarClicked.emit();
  }

  onQRLeido() {
    if (this.form.controls.qr.value) {
      this.qrAceptado.emit();
    }
  }

  mostrarLecturaQR() {
    this.qrComponent.onLeerQR();
  }

  getIdMovimiento(): number {
    return this.idMovimiento;
  }
}
