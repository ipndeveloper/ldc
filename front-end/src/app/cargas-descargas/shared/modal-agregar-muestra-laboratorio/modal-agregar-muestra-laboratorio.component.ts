import { Component, OnInit, ViewChild, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalComponent } from '../../../core/components/modal/modal.component';
import { Resources } from '../../../../locale/artifacts/resources';

@Component({
  selector: 'yrd-modal-agregar-muestra-laboratorio',
  templateUrl: './modal-agregar-muestra-laboratorio.component.html',
  styleUrls: ['./modal-agregar-muestra-laboratorio.component.css']
})
export class ModalAgregarMuestraLaboratorioComponent implements OnInit {

  muestraLaboratorioForm: FormGroup;
  @Output() accepted: EventEmitter<FormGroup> = new EventEmitter();
  @ViewChild('modalComponent') modal: ModalComponent;
  @Input() labelHeader = 'Autorizar Muestra a Laboratorio';

  validationMessagesCodigoBarras = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.CodigoBarra),
    pattern: Resources.Messages.CampoAdmiteSoloNumeros
  };

  validationMessagesObservaciones = {
    required: Resources.Messages.ElCampoXEsRequerido.format(Resources.Labels.Observacion),
    maxlength: Resources.Messages.DebeIngresarHasta250Caracteres
  };

  constructor(private readonly fb: FormBuilder) { }

  ngOnInit() {
    this.muestraLaboratorioForm = this.fb.group({
      codigoBarras: [{ value: '', disabled: false }, [Validators.required, Validators.pattern('^[0-9]*$')]],
      observaciones: [{ value: '', disabled: false }, [Validators.required, Validators.maxLength(250)]]
    });
  }

  onAccept() {
    if (this.isValidForm()) {
      this.accepted.emit(this.muestraLaboratorioForm);
    }
  }

  open() {
    this.modal.open();
  }

  close() {
    this.modal.close();
  }

  onClosing() {
    this.muestraLaboratorioForm.reset();
  }

  private isValidForm(): boolean {
    const codigoBarras = this.muestraLaboratorioForm.get('codigoBarras');
    const observaciones = this.muestraLaboratorioForm.get('observaciones');

    if (codigoBarras && observaciones) {
      codigoBarras.markAsTouched();
      observaciones.markAsTouched();

      codigoBarras.updateValueAndValidity();
      observaciones.updateValueAndValidity();
    }

    return this.muestraLaboratorioForm.valid;
  }
}
