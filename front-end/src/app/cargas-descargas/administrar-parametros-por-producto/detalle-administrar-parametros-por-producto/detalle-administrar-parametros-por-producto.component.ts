import { Component, ViewChild, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DespegableTipoProductoComponent } from '../../../shared/desplegable-tipo-producto/desplegable-tipo-producto.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-detalle-administrar-parametros-por-producto',
  templateUrl: './detalle-administrar-parametros-por-producto.component.html',
  styleUrls: ['./detalle-administrar-parametros-por-producto.component.css']
})
export class DetalleAdministrarParametrosPorProductoComponent {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;
  @ViewChild('tipoProductoDescarga') tipoProductoDescarga: DespegableTipoProductoComponent;

  readonly validationMessagesProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Producto)
  };
  readonly validationMessagesTipoProducto = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TipoProducto)
  };
  readonly validationMessagesCoeficienteConversionLitros = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CoeficienteConversionLitros)
  };
  readonly validationMessagesValorLimiteHumedadParaRechazo = {
    min: Resources.Messages.SeDebeIngresarUnValorMayorA.format('0')
  };
  readonly validationMessagesEquivalenciaArchestra = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.EquivalenciaArchestra)
  };

  setFocus(): void {
    setTimeout(() => this.tipoProductoDescarga.setFocus(), 0);
  }
}
