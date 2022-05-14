import { Component, Input } from '@angular/core';
import { DetalleSobreTransporteDataView } from '../../../../shared/data-models/sobre-transporte-data-view';

@Component({
  selector: 'yrd-detalle-sobre-transporte',
  templateUrl: './detalle-sobre-transporte.component.html',
  styleUrls: ['./detalle-sobre-transporte.component.css']
})
export class DetalleSobreTransporteComponent {

  @Input() detalleSobreTransporte: DetalleSobreTransporteDataView | null;

  get roles() {
    return this.detalleSobreTransporte ? this.detalleSobreTransporte.roles : null;
  }

  get usuarios() {
    return this.detalleSobreTransporte ? this.detalleSobreTransporte.usuarios : null;
  }

  get circuitos() {
    return this.detalleSobreTransporte ? this.detalleSobreTransporte.circuitos : null;
  }

  get rubrosCalidad() {
    return this.detalleSobreTransporte ? this.detalleSobreTransporte.rubrosCalidad : null;
  }

  get autorizacionesBalanza() {
    return this.detalleSobreTransporte ? this.detalleSobreTransporte.autorizacionesBalanza : null;
  }

  get tipoDispositivoPorProducto() {
    return this.detalleSobreTransporte ? this.detalleSobreTransporte.tipoDispositivoPorProducto : null;
  }

  constructor() { }
}
