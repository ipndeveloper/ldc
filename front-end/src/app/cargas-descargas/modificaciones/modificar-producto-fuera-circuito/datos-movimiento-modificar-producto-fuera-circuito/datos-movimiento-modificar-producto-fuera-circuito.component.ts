import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { MovimientoCerealGrano } from '../../../../shared/data-models/movimiento-cereal-grano';

@Component({
  selector: 'yrd-datos-movimiento-modificar-producto-fuera-circuito',
  templateUrl: './datos-movimiento-modificar-producto-fuera-circuito.component.html',
  styleUrls: ['./datos-movimiento-modificar-producto-fuera-circuito.component.css'],
  providers: [FormComponentService]
})
export class DatosMovimientoModificarProductoFueraCircuitoComponent implements OnInit {

  @Input() datosMovimientoForm: FormGroup;

  constructor(private readonly formComponentService: FormComponentService) { }

  ngOnInit() {
    this.formComponentService.initialize(this.datosMovimientoForm);
  }

  loadMovimiento(movimiento: MovimientoCerealGrano): any {
    this.formComponentService.setValue('tipoDocumentoPorte', movimiento.tipoDocumentoPorte.descripcion, {onlySelf: true});
    this.formComponentService.setValue('nroDocumentoPorte', movimiento.nroDocumentoPorte, {onlySelf: true});
    this.formComponentService.setValue('patenteCamion', movimiento.patenteCamion, {onlySelf: true});
    this.formComponentService.setValue('vagon', movimiento.numeroVagon, {onlySelf: true});
    this.formComponentService.setValue('titular', movimiento.titular ? movimiento.titular.descripcion : '', {onlySelf: true});
    this.formComponentService.setValue('fechaEntrada', movimiento.fechaEntrada, {onlySelf: true});
    this.formComponentService.setValue('fechaOperacion', movimiento.fechaOperacion, {onlySelf: true});
    this.formComponentService.setValue('fechaSalida', movimiento.fechaSalida, {onlySelf: true});
    this.formComponentService.setValue('netoBalanza', movimiento.kgNeto, {onlySelf: true});
  }
}
