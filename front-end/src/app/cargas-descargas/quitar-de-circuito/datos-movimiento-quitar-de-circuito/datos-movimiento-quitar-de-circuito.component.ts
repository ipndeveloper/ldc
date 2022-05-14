import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { MovimientoQuitarDeCircuitoDataView } from '../../../shared/data-models/movimiento-quitar-de-circuito-data-view';

@Component({
  selector: 'yrd-datos-movimiento-quitar-de-circuito',
  templateUrl: './datos-movimiento-quitar-de-circuito.component.html',
  styleUrls: ['./datos-movimiento-quitar-de-circuito.component.css']
})
export class DatosMovimientoQuitarDeCircuitoComponent implements OnChanges {

  @Input() datosMovimientoForm: FormGroup;
  @Input() movimiento: MovimientoQuitarDeCircuitoDataView;

  constructor(private readonly formComponentService: FormComponentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['movimiento'] && changes['movimiento'].currentValue) {
      this.completeDatosMovimientoForm();
    }
  }

  private completeDatosMovimientoForm() {
    this.formComponentService.setValue(`datosMovimiento.tipoTransporte`, this.movimiento.tipoTransporte, { onlySelf: true }); // TODO:
    this.formComponentService.setValue(`datosMovimiento.tipoMovimiento`, this.movimiento.tipoMovimiento, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estadoMovimiento`, this.movimiento.estado.descripcion, { onlySelf: true });

    this.formComponentService.setValue(`datosMovimiento.tipoDocumentoPorte`,
     this.movimiento.tipoDocumentoPorte.descripcion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.nroDocumentoPorte`, this.movimiento.nroDocumentoPorte, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.numeroCTG`, this.movimiento.numeroCTG, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.producto`, this.movimiento.producto.descripcion, { onlySelf: true });

    this.formComponentService.setValue(`datosMovimiento.patenteCamion`, this.movimiento.patenteCamion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.numeroVagon`, this.movimiento.numeroVagon, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.fechaHoraEntrada`, this.movimiento.fechaIngreso, { onlySelf: true });

    this.formComponentService.setValue(`datosMovimiento.titular`, this.movimiento.titularRazonSocial, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.vendedor`, this.movimiento.vendedorRazonSocial, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.entregador`, this.movimiento.entregadorRazonSocial, { onlySelf: true });

    this.formComponentService.setValue(`datosMovimiento.turnoPlaya`, this.movimiento.turnoPlaya, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estadoCupo`, this.movimiento.estadoCupo, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.nroCupo`, this.movimiento.nroCupo, { onlySelf: true });

    this.formComponentService.setValue(`datosMovimiento.ordenCarga`, this.movimiento.ordenCarga, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.numeroViaje`, this.movimiento.numeroViaje, { onlySelf: true });
  }
}
