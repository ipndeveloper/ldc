import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../../locale/artifacts/resources';
import { ParametrosTerminalService } from '../../../shared/services/parametros-terminal.service';

@Component({
  selector: 'yrd-datos-transporte-datos-documento',
  templateUrl: './datos-transporte-datos-documento.component.html',
  styleUrls: ['./datos-transporte-datos-documento.component.css']
})
export class DatosTransporteDatosDocumentoComponent implements OnInit {

  @Input() form: FormGroup;
  patentesPattern = '';

  validationMessagesKilometrosRecorridos = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.KilometrosRecorridos),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.KilometrosRecorridos, '0')
  };

  validationMessagesTarifaReferencia = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TarifaDeReferencia),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.TarifaDeReferencia, '0')
  };

  validationMessagesTarifaTN = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.TarifaTN),
    min: Resources.Messages.ElCampoXDebeSerMayorAY.format(Resources.Labels.TarifaTN, '0')
  };

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PatenteCamion),
    pattern: Resources.Messages.FormatoDelCampoXIncorrecto.format(Resources.Labels.PatenteCamion),
  };

  validationMessagesPatenteAcoplado = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.PatenteAcoplado),
    pattern: Resources.Messages.FormatoDelCampoXIncorrecto.format(Resources.Labels.PatenteAcoplado),
  };

  constructor(private readonly parametrosTerminalService: ParametrosTerminalService) { }

  ngOnInit() {
    this.parametrosTerminalService.getFormatosPatente().subscribe((values: string[]) => {
      if (values) {
        this.patentesPattern = values.join('|');
      }
    });
  }

  onBlurPatenteCamion() {
    const patenteCamionCtl = this.form.get('patentes.patenteCamion');
    if (patenteCamionCtl) {
      patenteCamionCtl.setValue(patenteCamionCtl.value.toUpperCase());
    }
  }

  onBlurPatenteAcoplado() {
    const patenteAcopladoCtl = this.form.get('patentes.patenteAcoplado');
    if (patenteAcopladoCtl) {
      patenteAcopladoCtl.setValue(patenteAcopladoCtl.value.toUpperCase());
    }
  }
}
