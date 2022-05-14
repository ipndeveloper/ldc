import { Component, Input, ViewChild, OnInit, Output, EventEmitter, } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AutocompletePatenteComponent } from '../../../shared/autocomplete-patente/autocomplete-patente.component';
import { Resources } from '../../../../locale/artifacts/resources';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { Collection } from '../../../core/models/collection';

@Component({
  selector: 'yrd-filtro-checklist-control-patrimonial',
  templateUrl: './filtro-checklist-control-patrimonial.component.html',
  styleUrls: ['./filtro-checklist-control-patrimonial.component.css']
})

export class FiltroChecklistControlPatrimonialComponent
       implements OnInit {

  @Input() form: FormGroup;
  @Output() buscarClicked = new EventEmitter();
  @ViewChild('autocompletePatente') autocompletePatente: AutocompletePatenteComponent;

  get botonBuscarDeshabilitado(): boolean {
    return this.form.disabled;
  }

  private readonly fcService: FormComponentService;

  validationMessagesPatenteCamion = {
    required: Resources.Messages.ElCampoXEsRequeridoParaBuscar.format(Resources.Labels.PatenteCamion)
  };

  constructor(popupService: PopupService) {
    this.fcService = new FormComponentService(popupService);
  }

  ngOnInit() {
    this.fcService.initialize(this.form);
    this.setFocus();
  }

  onClickBuscar() {
    if (this.fcService.isValidForm()) {
      this.buscarClicked.emit();
    } else {
      const errors = new Collection<string>();
      this.fcService.validateForm(this.form.controls, errors, '');
      this.fcService.showValidationError(errors);
      this.setFocus();
    }
  }

  setEnableFiltroBusqueda(enable: boolean) {
    if (this.form) {
      enable ? this.form.enable() : this.form.disable();
    }
  }

  private setFocus() {
    setTimeout(() => {
      if (this.autocompletePatente) {
        this.autocompletePatente.setFocus();
      }
    }, 0);
  }

}
