import { Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { TextoConEtiquetaComponent } from '../../../core/controls/texto-con-etiqueta/texto-con-etiqueta.component';
import { Collection } from '../../../core/models/collection';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { ReimprimirObleaLaboratorioService } from '../reimprimir-oblea-laboratorio.service';

@Component({
  selector: 'yrd-filtro-busqueda-reimpresion-oblea-laboratorio',
  templateUrl: './filtro-busqueda-reimpresion-oblea-laboratorio.component.html',
  styleUrls: ['./filtro-busqueda-reimpresion-oblea-laboratorio.component.css'],
  providers: [ReimprimirObleaLaboratorioService]
})
export class FiltroBusquedaReimpresionObleaLaboratorioComponent {

  @Input() form: FormGroup;
  @Input() disableButtons: boolean;
  @Output() buscarClicked = new EventEmitter();
  @ViewChild('inputNumeroDocumentoPorte') documentoPorte: TextoConEtiquetaComponent;
  tipoDocPorteRegex: Array<any>;

  readonly validationMessagesNroPorte = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.NumeroDocumentoPorte),
    maxlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara,
    minlength: Resources.Messages.ElCampoNumeroDocumentoPorteNoCoindideConElLargoDeLaMascara
  };
  constructor(private readonly fcService: FormComponentService) {
  }

  onClickBuscar() {
    if (!this.fcService.isValidForm()) {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
    this.buscarClicked.emit();
  }

  onClickLimpiar() {
    this.fcService.resetForm();
  }

  setFocus(): any {
    setTimeout(() => {
      this.documentoPorte.setFocus();
    }, 0);
  }
}
