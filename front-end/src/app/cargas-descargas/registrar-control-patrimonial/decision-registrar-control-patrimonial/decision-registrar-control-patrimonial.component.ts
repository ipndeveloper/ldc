import { Input, Component, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { DesplegableValorBooleanoComponent } from '../../../shared/desplegable-valor-booleano/desplegable-valor-booleano.component';

@Component({
  selector: 'yrd-decision-registrar-control-patrimonial',
  templateUrl: './decision-registrar-control-patrimonial.component.html',
  styleUrls: ['./decision-registrar-control-patrimonial.component.css']
})

export class DecisionRegistrarControlPatrimonialComponent {

  @Input() form: FormGroup;
  @ViewChild('decision') decisionComponent: DesplegableValorBooleanoComponent;
  readonly CINCO_MEBIBYTE = 5242880;
  readonly ERROR_MESSAGE = Resources.Messages.ArchivoDebePesarMenosDeX.format('5 MB');
  readonly validationMessagesDecision = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Decision)
  };

  setEnableDecision(enable: boolean): void {
    if (this.form) {
      enable ? this.form.enable() : this.form.disable();
      this.decisionComponent.setFocus();
    }
  }
}
