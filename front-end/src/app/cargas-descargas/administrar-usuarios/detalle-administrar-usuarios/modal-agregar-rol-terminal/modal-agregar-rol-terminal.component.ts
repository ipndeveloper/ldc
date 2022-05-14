import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { DesplegableTerminalComponent } from '../../../../shared/desplegable-terminal/desplegable-terminal.component';
import { ModalComponent } from '../../../../core/components/modal/modal.component';
import { FormComponentService } from '../../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../../core/services/popupService/popup.service';
import { Collection } from '../../../../core/models/collection';
import { RolTerminalDataView } from '../../../../shared/data-models/usuario-data-view';
import { Resources } from '../../../../../locale/artifacts/resources';
import { Permission } from '../../../../shared/enums/enums';

@Component({
  selector: 'yrd-modal-agregar-rol-terminal',
  templateUrl: './modal-agregar-rol-terminal.component.html',
  styleUrls: ['./modal-agregar-rol-terminal.component.css']
})
export class ModalAgregarRolTerminalComponent implements OnInit {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('terminal') terminal: DesplegableTerminalComponent;
  @Input() form: FormGroup;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  readonly Permission = Permission;
  private readonly fcService: FormComponentService;
  private rolTerminal: RolTerminalDataView | null = null;
  labelHeader = 'Administrar roles de usuario';

  validationMessagesTerminal = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Terminal)
  };
  validationMessagesRol = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Rol)
  };

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
  }

  open() {
    this.fcService.initialize(this.form);
    this.updateValidators(true);
    if (this.rolTerminal) {
      this.fcService.setValue('id', this.rolTerminal.id, {onlySelf: true});
      this.fcService.setValue('terminal', this.rolTerminal.terminal, {onlySelf: true}, true);
      this.fcService.setValue('rol', this.rolTerminal.rol, {onlySelf: true}, true);
      this.fcService.setValue('habilitado', this.rolTerminal.habilitado, {onlySelf: true}, false);
    } else {
      this.fcService.setValue('id', Math.floor(Math.random() * -1000), {onlySelf: true});
      this.fcService.enableControl('terminal');
      this.fcService.enableControl('rol');
      this.fcService.setValue('habilitado', true, {onlySelf: true}, true);
    }
    this.modal.open();
    setTimeout(() => this.terminal.setFocus(), 0);
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
    this.rolTerminal = null;
    this.form.reset();
    this.closing.emit();
    this.updateValidators(false);
  }

  modificar(rolTerminal: RolTerminalDataView) {
    this.rolTerminal = rolTerminal;
    this.open();
  }

  private updateValidators(required: boolean) {
    if (required) {
      this.form.controls.terminal.setValidators(Validators.required);
      this.form.controls.rol.setValidators(Validators.required);
    } else {
      this.form.controls.terminal.clearValidators();
      this.form.controls.rol.clearValidators();
    }
  }

}
