import { Component, OnInit, ViewChild, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { ModalComponent } from '../../../../../core/components/modal/modal.component';
import { FormGroup, AbstractControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Resources } from '../../../../../../locale/artifacts/resources';
import { FormComponentService } from '../../../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../../../core/services/popupService/popup.service';
import { Collection } from '../../../../../core/models/collection';
import { DesplegableRolComponent } from '../../../../../shared/desplegable-rol/desplegable-rol.component';

@Component({
  selector: 'yrd-modal-agregar-destinatario',
  templateUrl: './modal-agregar-destinatario.component.html',
  styleUrls: ['./modal-agregar-destinatario.component.css']
})
export class ModalAgregarDestinatarioComponent implements OnInit, OnDestroy {

  @ViewChild('modalComponent') modal: ModalComponent;
  @ViewChild('rol') rol: DesplegableRolComponent;
  @Input() form: FormGroup;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();

  labelHeader = 'Administrar Destinatarios';
  private readonly onDestroy = new Subject();
  private readonly fcService: FormComponentService;
  private destinatario: any;

  validationMessagesRol = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Rol)
  };
  validationMessagesUsuario = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Usuario)
  };
  validationMessagesMail = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Mail),
    pattern: Resources.Messages.FormatoDelCampoXIncorrecto.format(Resources.Labels.Mail)
  };

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() {
    this.subscribeToFormChanges();
  }

  private subscribeToFormChanges() {
    this.form.controls.idTipo.valueChanges
      .pipe(takeUntil(this.onDestroy))
      .subscribe(value => this.ontipoDestinatarioChaged(value));
  }

  private ontipoDestinatarioChaged(value: number) {
    if (value === 1) {
      this.habilitarControl(true, this.form.controls.rol);
      this.habilitarControl(false, this.form.controls.usuario);
      this.habilitarControl(false, this.form.controls.mail);
    } else if (value === 2) {
      this.habilitarControl(false, this.form.controls.rol);
      this.habilitarControl(true, this.form.controls.usuario);
      this.habilitarControl(false, this.form.controls.mail);
    } else {
      this.habilitarControl(false, this.form.controls.rol);
      this.habilitarControl(false, this.form.controls.usuario);
      this.habilitarControl(true, this.form.controls.mail);
    }
  }

  private habilitarControl(habilitar: boolean, control: AbstractControl) {
    if (habilitar) {
      control.enable();
    } else {
      control.setValue(null);
      control.disable();
    }
  }

  open() {
    if (this.destinatario) {
      this.form.controls.idTipo.setValue(this.destinatario.idTipo);
      this.form.controls.rol.setValue(this.destinatario.rol);
      this.form.controls.usuario.setValue(this.destinatario.usuario);
      this.form.controls.mail.setValue(this.destinatario.mail);
    } else {
      this.form.controls.idTipo.setValue(1);
      this.form.controls.rol.setValue(null);
      this.form.controls.usuario.setValue(null);
      this.form.controls.mail.setValue(null);
    }
    this.updateValidators(true);
    this.modal.open();
    setTimeout(() => this.rol.setFocus(), 0);
  }

  ngOnDestroy() {
    this.onDestroy.next(true);
    this.onDestroy.unsubscribe();
  }

  onClosing() {
    this.destinatario = null;
    this.form.reset();
    this.closing.emit();
    this.updateValidators(false);
  }

  onAccept() {
    const errors = new Collection<string>();
    this.fcService.initialize(this.form);
    this.fcService.validateForm(this.form.controls, errors, '');
    this.fcService.showValidationError(errors);

    if (this.fcService.isValidForm()) {
      this.accepted.emit();
    }
  }

  private updateValidators(required: boolean) {
    if (required) {
      this.form.controls.rol.setValidators(Validators.required);
      this.form.controls.usuario.setValidators(Validators.required);
      this.form.controls.mail.setValidators([Validators.required, Validators.pattern(/\S+@\S+\.\S+/)]);
    } else {
      this.form.controls.rol.clearValidators();
      this.form.controls.usuario.clearValidators();
      this.form.controls.mail.clearValidators();
    }
  }

  close() {
    this.updateValidators(false);
    this.modal.close();
  }

  modificar(destinatario: any) {
    this.destinatario = destinatario;
    this.open();
  }

}
