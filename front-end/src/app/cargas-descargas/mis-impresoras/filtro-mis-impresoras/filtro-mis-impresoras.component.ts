import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Collection } from '../../../core/models/collection';

@Component({
  selector: 'yrd-filtro-mis-impresoras',
  templateUrl: './filtro-mis-impresoras.component.html',
  styleUrls: ['./filtro-mis-impresoras.component.css']
})
export class FiltroMisImpresorasComponent implements OnInit {

  @Input() esAdmin = false;
  @Input() form: FormGroup;
  @Output() buscarClicked = new EventEmitter();

  private readonly fcService: FormComponentService;

  validationMessagesUsuario = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.Usuario)
  };

  constructor(popupService: PopupService) {
    this.fcService = new FormComponentService(popupService);
  }

  ngOnInit() {
    this.fcService.initialize(this.form);
  }

  onBuscar() {
    if (this.fcService.isValidForm()) {
      this.buscarClicked.emit();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
    }
  }

}
