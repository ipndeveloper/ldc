import { Component, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FechaConEtiquetaComponent } from '../../../core/controls/fecha-con-etiqueta/fecha-con-etiqueta.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-fecha-periodo-stock-san',
  templateUrl: './fecha-periodo-stock-san.component.html',
  styleUrls: ['./fecha-periodo-stock-san.component.css']
})
export class FechaPeriodoStockSanComponent {
  @Input() fechaPeriodoStockSanForm: FormGroup;

  @ViewChild('fechaStockComponent') fechaStockComponent: FechaConEtiquetaComponent;

  validationMessagesFechaStock = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaStockSAN),
    fechaDebeSerMenorIgualAFechaDelDia: Resources.Messages.LaFechaStockSANDebeSerMenorOIgualAHoy
  };

  constructor() { }

  setFocus() {
    this.fechaStockComponent.setFocus();
  }

}
