import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { FormGroup, Validators } from '@angular/forms';
import { FormComponentService } from '../../../core/services/formComponent/formComponent.service';
import { PopupService } from '../../../core/services/popupService/popup.service';
import { Collection } from '../../../core/models/collection';
import { Resources } from '../../../../locale/artifacts/resources';


@Component({
  selector: 'yrd-modal-importar-excel',
  templateUrl: './modal-importar-excel.component.html',
  styleUrls: ['./modal-importar-excel.component.css']
})
export class ModalImportarExcelComponent implements OnInit {

  @Input() form: FormGroup;
  @Output() accepted = new EventEmitter();
  @Output() closing = new EventEmitter();
  @ViewChild('modalComponent') modal: ModalComponent;

  readonly validationMessagesArchivo = {
    required: Resources.Messages.ElXEsRequerido.format(Resources.Labels.Archivo)
  };

  readonly CINCO_MEBIBYTE = 5242880;

  private readonly fcService: FormComponentService;

  constructor(private readonly popupService: PopupService) {
    this.fcService = new FormComponentService(this.popupService);
  }

  ngOnInit() { }

  onClosing() {
    this.form.controls.archivos.clearValidators();
    this.form.controls.archivos.updateValueAndValidity();
    this.form.reset();
    this.closing.emit();
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

  open() {
    this.fcService.initialize(this.form);
    this.modal.open();
    this.form.controls.archivos.setValidators([Validators.required]);
    this.form.controls.archivos.updateValueAndValidity();
  }

  close() {
    this.modal.close();
  }

}
