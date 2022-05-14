import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { ControlarCalidadCargaDataView } from '../../../shared/data-models/controlar-calidad-carga-data-view';

@Component({
  selector: 'yrd-datos-registrar-control-patrimonial',
  templateUrl: './datos-registrar-control-patrimonial.component.html',
  styleUrls: ['./datos-registrar-control-patrimonial.component.css']
})
export class DatosRegistrarControlPatrimonialComponent
  implements OnInit {

  @Input() form: FormGroup;
  private readonly fcService: FormComponentService;

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit(): void {
    this.fcService.initialize(this.form);
  }

  completaDatoMovimiento(movimiento: ControlarCalidadCargaDataView | null): void {
    if (movimiento) {
      this.fcService.setValue('id', movimiento.id, {onlySelf: true}, true);
      this.fcService.setValue('tipoDocumentoPorte', movimiento.tipoDocumentoPorte, {onlySelf: true}, true);
      this.fcService.setValue('nroDocumentoPorte', movimiento.numeroDocumentoPorte, {onlySelf: true}, true);
      this.fcService.setValue('producto', movimiento.producto, {onlySelf: true}, true);
      this.fcService.setValue('estado', movimiento.estado, {onlySelf: true}, true);
      this.fcService.setValue('ordenCarga', movimiento.ordenCarga, {onlySelf: true}, true);
      this.fcService.setValue('nroViaje', movimiento.nroViaje, {onlySelf: true}, true);
      this.fcService.setValue('titularCP', movimiento.titularCP, {onlySelf: true}, true);
      this.fcService.setValue('vendedor', movimiento.vendedor, {onlySelf: true}, true);
      this.fcService.setValue('patente', movimiento.patente, {onlySelf: true}, true);
    }
  }
}
