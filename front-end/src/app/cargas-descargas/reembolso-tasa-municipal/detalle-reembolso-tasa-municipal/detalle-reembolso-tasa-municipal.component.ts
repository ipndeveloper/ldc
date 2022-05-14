import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { ReembolsoTasaMunicipalDataView } from '../../../shared/data-models/reembolso-tasa-municipal-data-view';

@Component({
  selector: 'yrd-detalle-reembolso-tasa-municipal',
  templateUrl: './detalle-reembolso-tasa-municipal.component.html',
  styleUrls: ['./detalle-reembolso-tasa-municipal.component.css']
})
export class DetalleReembolsoTasaMunicipalComponent implements OnInit {

  @ViewChild('pesoBrutoInput') pesoBrutoInput: TextoConEtiquetaComponent;
  @Input() form: FormGroup;
  @Input() disableButtons: boolean;

  @Output() reembolsarClicked = new EventEmitter();
  @Output() limpiarClicked = new EventEmitter();

  private readonly fcService: FormComponentService;

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
   }

  ngOnInit(): void {
    this.fcService.initialize(this.form);
  }

  completaDatoMovimiento(movimiento: ReembolsoTasaMunicipalDataView | null): void {
    if (movimiento) {
      this.fcService.setValue('id', movimiento.idMovimiento, {onlySelf: true}, true);
      this.fcService.setValue('patenteCamion', movimiento.patenteCamion, {onlySelf: true}, true);
      this.fcService.setValue('tipoDocumentoPorte', movimiento.tipoDocumentoPorte, {onlySelf: true}, true);
      this.fcService.setValue('numeroDocumentoPorte', movimiento.numeroDocumentoPorte, {onlySelf: true}, true);
      this.fcService.setValue('pesoBruto', movimiento.kgPesoBruto, {onlySelf: true}, true);
      this.fcService.setValue('moneda', {id: movimiento.idMoneda}, {onlySelf: true}, true);
      this.fcService.setValue('tarifa', movimiento.tarifa, {onlySelf: true}, true);
      this.fcService.setValue('medioDePago', {id: movimiento.idMedioPago}, {onlySelf: true}, true);
    }
  }

  onClickReembolsar(): void {
    this.reembolsarClicked.emit();
  }

  onClickLimpiar(): void {
    this.limpiarClicked.emit();
  }

}
