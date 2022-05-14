import { Component, OnInit, Input } from '@angular/core';
import { ChecklistControlPatrimonialDataView } from '../../../shared/data-models/checklist-control-patrimonial-data-view';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';

@Component({
  selector: 'yrd-datos-checklist-control-patrimonial',
  templateUrl: './datos-checklist-control-patrimonial.component.html',
  styleUrls: ['./datos-checklist-control-patrimonial.component.css']
})

export class DatosChecklistControlPatrimonialComponent
       implements OnInit {

  @Input() form: FormGroup;
  fcService: FormComponentService;

  constructor(popupService: PopupService) {
    this.fcService = new FormComponentService(popupService);
  }

  ngOnInit() {
    this.fcService.initialize(this.form);
  }

  completaDatoMovimiento(movimiento: ChecklistControlPatrimonialDataView | null) {
    if (movimiento) {
      this.fcService.setValue('id', movimiento.id, {onlySelf: true}, true);
      this.fcService.setValue('tipoDocumentoPorte', movimiento.tipoDocumentoPorte, {onlySelf: true}, true);
      this.fcService.setValue('nroDocumentoPorte', movimiento.numeroDocumentoPorte, {onlySelf: true}, true);
      this.fcService.setValue('producto', movimiento.producto.descripcion, {onlySelf: true}, true);
      this.fcService.setValue('estado', movimiento.estado, {onlySelf: true}, true);
      this.fcService.setValue('ordenCarga', movimiento.ordenCarga, {onlySelf: true}, true);
      this.fcService.setValue('nroViaje', movimiento.nroViaje, {onlySelf: true}, true);
      this.fcService.setValue('titularCP', movimiento.titularCP, {onlySelf: true}, true);
      this.fcService.setValue('vendedor', movimiento.vendedor, {onlySelf: true}, true);
      this.fcService.setValue('patente', movimiento.patente, {onlySelf: true}, true);
    }
  }

}
