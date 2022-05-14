import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { DatosPesajeComponent } from '../../shared/datos-pesaje/datos-pesaje.component';
import { DetalleMermasComponent } from './detalle-mermas/detalle-mermas.component';
import { MovimientoPesaje } from '../../registrar-peso/movimiento-pesaje';
import { TiposProducto } from '../../../shared/enums/enums';
import { TipoProducto } from '../../../shared/data-models/tipo-producto';

@Component({
  selector: 'yrd-consulta-datos-stock',
  templateUrl: './consulta-datos-stock.component.html',
  styleUrls: ['./consulta-datos-stock.component.css']
})
export class ConsultaDatosStockComponent implements OnInit {

  @Input() formDatosStock: FormGroup;
  @Input() movimiento: Movimiento;
  @Input() movimientoPesaje: MovimientoPesaje;
  @Input() esAutomatico: boolean;
  @Input() tipoProducto: TipoProducto;
  @Input() esCarga = false;
  @ViewChild('datosPesaje') datosPesajeComponent: DatosPesajeComponent;
  @ViewChild('detalleMermas') detalleMermasComponent: DetalleMermasComponent;

  constructor() { }

  ngOnInit() {
  }

  get esMovimientoInsumo(): boolean {
    return this.tipoProducto.id === TiposProducto.Insumos || this.tipoProducto.id === TiposProducto.InsumosLiquidos;
  }

  get netoBalanza(): number | undefined {
    if (this.datosPesajeComponent) {
      const ctlNetoBalanza = this.datosPesajeComponent.datosPesajeForm.get('netoBalanza');
      if (ctlNetoBalanza) {
        return Number(ctlNetoBalanza.value);
      }
    }
  }

  get totalMermas(): number | undefined {
    if (this.detalleMermasComponent) {
      const ctlTotalMermas = this.detalleMermasComponent.form.get('totalMermas');
      if (ctlTotalMermas) {
        return Number(ctlTotalMermas.value);
      }
    } else {
      return 0;
    }
  }

}
