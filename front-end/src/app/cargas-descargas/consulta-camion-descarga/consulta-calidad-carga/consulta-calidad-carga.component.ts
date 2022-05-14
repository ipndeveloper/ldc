import { Component, OnChanges, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ControlarCalidadCamionCargaService } from '../../controlar-calidad-camion-carga/controlar-calidad-camion-carga.service';
import { Movimiento } from '../../../shared/data-models/movimiento';
import { DecisionControlarCalidadCamionCargaDataView } from '../../../shared/data-models/decision-controlar-calidad-camion-carga-cata-view';

@Component({
  selector: 'yrd-consulta-calidad-carga',
  templateUrl: './consulta-calidad-carga.component.html',
  styleUrls: ['./consulta-calidad-carga.component.css']
})
export class ConsultaCalidadCargaComponent implements OnChanges {
  @Input() decisionMovimientoForm: FormGroup;
  @Input() movimiento: Movimiento;

  constructor(private readonly fcService: FormComponentService,
              private readonly service: ControlarCalidadCamionCargaService) { }


  ngOnChanges() {
    if (this.movimiento) {
      this.getData();
    }
  }

  private getData() {
    this.service.get(this.movimiento.id).subscribe((decisionCalidadMovimiento: DecisionControlarCalidadCamionCargaDataView) => {
      if (decisionCalidadMovimiento) {
        this.loadMovimiento(decisionCalidadMovimiento);
      }
    });
  }

  private loadMovimiento(calidadMovimiento: DecisionControlarCalidadCamionCargaDataView) {
    this.fcService.setValue('decisionMovimiento.decision', calidadMovimiento.decision, {onlySelf: true});
    this.fcService.setValue('decisionMovimiento.observacion', calidadMovimiento.observaciones, {onlySelf: true});
  }

}
