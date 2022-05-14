import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { Resources } from '../../../../../locale/artifacts/resources';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { Collection } from '../../../../core/models/collection';
import { ImpresoraUsuarioDataView } from '../../../../shared/data-models/usuario-data-view';
import { DesplegableImpresoraComponent } from '../../../../shared/desplegable-impresora/desplegable-impresora.component';

@Component({
  selector: 'yrd-modal-agregar-impresora',
  templateUrl: './modal-agregar-impresora.component.html',
  styleUrls: ['./modal-agregar-impresora.component.css']
})
export class ModalAgregarImpresoraComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('impresora') impresora: DesplegableImpresoraComponent;
  @Input() form: FormGroup;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  private readonly fcService: FormComponentService;
  private impresoraUsuario: ImpresoraUsuarioDataView | null = null;
  labelHeader = 'Administrar impresoras de usuario';

  validationMessagesImpresora = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Impresora)
  };

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
  }

  open() {
    this.fcService.initialize(this.form);
    this.updateValidators(true);
    if (this.impresoraUsuario) {
      this.fcService.setValue('id', this.impresoraUsuario.id, {onlySelf: true});
      this.fcService.setValue('impresora', this.impresoraUsuario.impresora, {onlySelf: true}, false);
      this.fcService.setValue('habilitado', this.impresoraUsuario.habilitado, {onlySelf: true}, false);
    } else {
      this.fcService.setValue('id', Math.floor(Math.random() * -1000), {onlySelf: true});
      this.fcService.enableControl('impresora');
      this.fcService.setValue('habilitado', true, {onlySelf: true}, true);
    }
    this.modal.open();
    // setTimeout(() => this.impresora.setFocus(), 0);
  }

  onAccept() {
    const errors = new Collection<string>();
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      this.accepted.emit();
    }
  }

  close() {
    this.updateValidators(false);
    this.modal.close();
  }

  onClosing() {
    this.impresoraUsuario = null;
    this.form.reset();
    this.closing.emit();
    this.updateValidators(false);
  }

  modificar(impresoraUsuario: ImpresoraUsuarioDataView) {
    this.impresoraUsuario = impresoraUsuario;
    this.open();
  }

  private updateValidators(required: boolean) {
    if (required) {
      this.form.controls.impresora.setValidators(Validators.required);
    } else {
      this.form.controls.impresora.clearValidators();
    }
  }

}
