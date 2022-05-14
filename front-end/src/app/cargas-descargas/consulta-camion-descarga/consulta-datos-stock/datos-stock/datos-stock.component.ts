import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movimiento } from '../../../../shared/data-models/movimiento';
import { MovimientoPesaje } from '../../../registrar-peso/movimiento-pesaje';

@Component({
  selector: 'yrd-datos-stock',
  templateUrl: './datos-stock.component.html',
  styleUrls: ['./datos-stock.component.css']
})
export class DatosStockComponent implements OnInit, OnChanges {

  @Input() datosStockForm: FormGroup;
  @Input() movimiento: Movimiento;
  @Input() movimientoPesaje: MovimientoPesaje;
  @Input() netoBalanza: number;
  @Input() totalMermas: number;

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
    if (this.netoBalanza !== undefined && this.totalMermas !== undefined) {
      this.datosStockForm.patchValue({netoDescarga: this.netoBalanza - this.totalMermas});
    }
    if (this.movimiento) {
      this.completarDatosMovimiento();
    }
    if (this.movimientoPesaje) {
      this.completarDatosMovimientoPesaje();
    }
  }

  private completarDatosMovimientoPesaje(): void {
    this.datosStockForm.patchValue({destino: this.movimientoPesaje.lugarDescargaCarga});
    this.datosStockForm.patchValue({coeficiente: this.movimientoPesaje.coeficienteConversionLitros});
  }

  private completarDatosMovimiento(): void {
    this.datosStockForm.patchValue({fechaStockSan: this.movimiento.fechaStockSan});
    this.datosStockForm.patchValue({nroTicketPesaje: this.movimiento.nroTicketPesaje});
    this.datosStockForm.patchValue({netoDescargaLitros: this.movimiento.netoDescargaLitros});
  }
}
