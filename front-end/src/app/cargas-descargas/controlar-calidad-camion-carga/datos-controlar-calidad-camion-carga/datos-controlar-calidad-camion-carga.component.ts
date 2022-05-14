import { Component, Input, SimpleChanges, OnChanges, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ControlarCalidadCargaDataView } from '../../../shared/data-models/controlar-calidad-carga-data-view';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableDecisionCalidadComponent } from '../../../shared/desplegable-decision-calidad/desplegable-decision-calidad.component';

@Component({
  selector: 'yrd-datos-controlar-calidad-camion-carga',
  templateUrl: './datos-controlar-calidad-camion-carga.component.html',
  styleUrls: ['./datos-controlar-calidad-camion-carga.component.css']
})

export class DatosControlarCalidadCamionCargaComponent implements OnChanges {

  @Input() datosMovimientoForm: FormGroup;
  @Input() decisionMovimientoForm: FormGroup;
  @Input() movimiento: ControlarCalidadCargaDataView;
  @ViewChild('caracteristica') caracteristicaDropDownComponent: DesplegableDecisionCalidadComponent;

  validationMessagesDecision = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Decision)
  };

  validationMessagesCoeficienteConversionLitros = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CoeficienteConversionLitros)
  };

  constructor(private readonly fcService: FormComponentService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes &&
        changes['movimiento'] &&
        changes['movimiento'].currentValue) {
      this.completeDatosMovimientoForm();
      this.completeDatosDecisionForm();
    }
  }

  private completeDatosMovimientoForm() {
    this.fcService.setValue(`datosMovimiento.tipoDocumentoPorte`,
                            this.movimiento.tipoDocumentoPorte, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.nroDocumentoPorte`,
                            this.movimiento.numeroDocumentoPorte, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.producto`,
                            this.movimiento.producto, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.estado`,
                            this.movimiento.estado, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.ordenCarga`,
                            this.movimiento.ordenCarga, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.nroViaje`,
                            this.movimiento.nroViaje, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.titularCP`,
                            this.movimiento.titularCP, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.vendedor`,
                            this.movimiento.vendedor, { onlySelf: true });
    this.fcService.setValue(`datosMovimiento.patente`,
                            this.movimiento.patente, { onlySelf: true });
  }

  private completeDatosDecisionForm() {
    this.fcService.setValue(`decisionMovimiento.coeficiente`,
                            this.movimiento.coeficiente, { onlySelf: true}, !this.movimiento.esCoeficienteVariable);
  }

  setFocus(): void {
    setTimeout(() => this.caracteristicaDropDownComponent.setFocus(), 0);
  }

}
