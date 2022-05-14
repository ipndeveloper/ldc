import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { Permission } from '../../../shared/enums/enums';

@Component({
  selector: 'yrd-detalle-administrar-rangos-codigo-barra-camara',
  templateUrl: './detalle-administrar-rangos-codigo-barra-camara.component.html',
  styleUrls: ['./detalle-administrar-rangos-codigo-barra-camara.component.css']
})
export class DetalleAdministrarRangosCodigoBarraCamaraComponent implements OnInit {

  @Input() form: FormGroup;
  @Input() esConsulta = false;
  @Input() esModificacion = false;
  @Input() isLoading = false;

  Permission = Permission;
  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  validationMessagesCodigoDesde = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoDesde),
    numberLessThan: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.CodigoDesde, Resources.Labels.CodigoHasta)
  };
  validationMessagesCodigoHasta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoHasta),
    numberLessThan: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.CodigoDesde, Resources.Labels.CodigoHasta)
  };
  validationMessagesFechaDesde = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaDesde),
    dateLessThan: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.FechaDesde, Resources.Labels.FechaHasta)
  };
  validationMessagesFechaHasta = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.FechaHasta),
    dateLessThan: Resources.Messages.ElCampoXDebeSerMenorAY.format(Resources.Labels.FechaDesde, Resources.Labels.FechaHasta)
  };

  constructor() { }

  ngOnInit() {
  }

  setFocus() {
  }

}
