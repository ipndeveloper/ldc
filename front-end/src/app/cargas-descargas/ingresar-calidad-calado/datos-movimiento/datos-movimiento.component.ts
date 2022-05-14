import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MovimientoCalado } from '../../../shared/data-models/movimiento-calado';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';

@Component({
  selector: 'yrd-datos-movimiento',
  templateUrl: './datos-movimiento.component.html',
  styleUrls: ['./datos-movimiento.component.css']
})
export class DatosMovimientoComponent implements OnInit, OnChanges {

  @Input() datosMovimientoForm: FormGroup;
  @Input() movimiento: MovimientoCalado;

  constructor(private readonly formComponentService: FormComponentService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['movimiento'] && changes['movimiento'].currentValue) {
      this.completeDatosMovimientoForm();
    }
  }

  private completeDatosMovimientoForm() {
    this.formComponentService.setValue(`datosMovimiento.tipoDocumentoPorte`, this.movimiento.tipoDocumentoPorteDescripcion,
    { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.nroDocumentoPorte`, this.movimiento.numeroDocumentoPorte, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.turno`, this.movimiento.turno, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estadoCupo`, this.movimiento.estadoCupo, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.producto`, this.movimiento.producto.descripcion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.estado`, this.movimiento.estado.descripcion, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.entregador`, this.movimiento.entregadorRazonSocial, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.titular`, this.movimiento.titularRazonSocial, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.destinatario`, this.movimiento.destinatarioRazonSocial, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.sede`, this.movimiento.sede, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.corredor`, this.movimiento.corredor, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.vendedor`, this.movimiento.vendedor, { onlySelf: true });
    this.formComponentService.setValue(`datosMovimiento.ctg`, this.movimiento.ctg, { onlySelf: true });
  }
}
